const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes? body.likes : 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())
  } catch (exception){
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
  const body = req.body

  try {
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(body.comment)
    await blog.save()
    const newBlog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1, id: 1 })
    res.status(201).json(newBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blogToUpdate = {
    ...body
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true })
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter