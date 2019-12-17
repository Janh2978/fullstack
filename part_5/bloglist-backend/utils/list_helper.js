const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum,item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxblog = (max,item) => {
    return item.likes > max.likes? item: max
  }

  return blogs.reduce(maxblog, blogs[0])
}

const mostBlogs = (blogs) => {
  let authorPosts = _.countBy(blogs, 'author')
  let maxPost = _.max(_.values(authorPosts))
  let author = _.findKey(authorPosts, (a) => {
    return a === maxPost
  })

  return {
    author: author,
    blogs: maxPost
  }
}

const mostLikes = (blogs) => {
  let amountLikes = _.map(_.groupBy(blogs, 'author'), (x) => {
    return x.reduce((acc,i) => acc + i.likes, 0)
  })
  let authors = _.keys(_.groupBy(blogs, 'author'))
  let index = amountLikes.indexOf(_.max(amountLikes))

  return {
    author: authors[index],
    likes: amountLikes[index]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}