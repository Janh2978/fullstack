const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id, genres: { $in: [args.genre] } })
        return books.map(async book => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author)
          }
        })
      } else if(args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id })
        return books.map(async book => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author)
          }
        })
      } else if(args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } })
        return books.map(async book => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author)
          }
        })
      } else {
        const books = await Book.find({})
        return books.map(async book => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author)
          }
        })
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      return authors
    }
  },
  Author: {
    bookCount: async (root) => root.books.length    
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if ( args.author.length < 4) {
        throw new UserInputError("author name too short")
      }
      if ( args.title.length < 4) {
        throw new UserInputError("book title too short")
      }

      try {
        const author = await Author.findOne({ name: args.author })

        if(author) {
          const book = new Book({ 
            title: args.title,
            published: args.published,
            author: author,
            genres: args.genres
          })
          const savedBook = await book.save()
          author.books = author.books.concat(savedBook)
          await author.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        }

        const newAuthor = new Author({
          name: args.author
        })
        const savedAuthor = await newAuthor.save()

        const book = new Book({ 
          title: args.title,
          published: args.published,
          author: savedAuthor,
          genres: args.genres
        })
        const savedBook = await book.save()
        newAuthor.books = newAuthor.books.concat(savedBook)
        await newAuthor.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {  
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})