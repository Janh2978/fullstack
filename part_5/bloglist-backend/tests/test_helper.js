const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'first',
    author: 'Jorge',
    url: 'local.com',
    likes: 0
  },
  {
    title: 'second',
    author: 'Jorge',
    url: 'local.com',
    likes: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}