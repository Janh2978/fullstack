import React, { useState, useEffect } from 'react'
import { useField } from './hooks'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const blogFormRef = React.createRef()
  const [message, setMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    (async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      console.log(exception)
      const newMessage = {
        text: 'wrong username or password',
        type: 'error'
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    try {
      const newBlogAdded = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlogAdded))
      title.reset()
      author.reset()
      url.reset()
      const newMessage = {
        text: `a new blog ${blogObject.title} by ${blogObject.author}`,
        type: 'success'
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changeBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id? blog.user.id : blog.user
    }
    const updatedBlog = await blogService.update(id, changeBlog)
    setBlogs(blogs.map(b => b.id===id ? updatedBlog : b))
  }

  const removeBlog = async (id, title, author) => {
    if (window.confirm(`remove blog ${title} by ${author}`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id!==id))
    }
  }

  const loginForm = () => (
    <>
      <h1>log in to application</h1>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.input}/>
        </div>
        <div>
          password
          <input {...password.input}/>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in{logOut()}</p>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlog}
          remove={removeBlog}
          currentUser={user}
          user={blog.user.id?blog.user:user}
        />
      )}
    </>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const logOut = () => (
    <button onClick={handleLogout}>Logout</button>
  )

  return (
    <div>
      {
        user === null ?
          loginForm() :
          blogForm()
      }
    </div>
  )
}

export default App