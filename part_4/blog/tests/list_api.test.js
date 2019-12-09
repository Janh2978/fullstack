const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// test('there are 2 post', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body.length).toBe(2)
// })

// test('the id property exists', async () => {
//   const response = await api.get('/api/blogs')
//   response.body.forEach(blog => {
//     expect(blog.id).toBeDefined()
//   })
// })

// test('a valid post can be added', async () => {
//   const newBlog = {
//     title: 'third',
//     author: 'Jorge',
//     url: 'local.com',
//     likes: 0
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

//   const contents = blogsAtEnd.map(n => n.title)
//   expect(contents).toContain(
//     'third'
//   )
// })

// test('post still valid even if like property is missing', async () => {
//   const newBlog = {
//     title: 'fourth',
//     author: 'Jorge',
//     url: 'local.com'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   const noLikePost = blogsAtEnd[blogsAtEnd.length-1]
//   expect(noLikePost.likes).toBeDefined()
// })

// test('blog without title and url is not added', async () => {
//   const newBlog = {
//     author: 'Jorge',
//     likes: 0
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
// })

// test('a blog post can be deleted', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd.length).toBe(
//     helper.initialBlogs.length - 1
//   )

//   const contents = blogsAtEnd.map(b => b.title)
//   expect(contents).not.toContain(blogToDelete.content)
// })

// test('a blog post can be updated', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const blogToUpdate = blogsAtStart[0]
//   const blogUpdate = {
//     'title': 'fifth',
//     'author': 'Alejandro',
//     'url': 'local.com',
//     'likes': 99
//   }

//   await api
//     .put(`/api/blogs/${blogToUpdate.id}`)
//     .send(blogUpdate)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd.length).toBe(
//     helper.initialBlogs.length
//   )

//   const contents = blogsAtEnd.map(b => b.title)
//   expect(contents).not.toContain(blogToUpdate.title)
//   expect(contents).toContain(blogUpdate.title)
// })

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash: '$2b$10$2CyZOc6R8WSJ1Wl3v.mG4.nwgioYWfqSu9bJBFLU6cqxvmwLsiSg2'
    })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message username is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'username',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message password is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'username',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message password is short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'username',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password length must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})