import React, { useState } from 'react'

const Blog = ({ blog, user, update, remove, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const isVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div onClick={toggleVisibility} className="visibleDefault">
        {blog.title} {blog.author}
      </div>
      <div style={isVisible} className="visibleClick">
        {blog.url}<br></br>
        {blog.likes}<button onClick={() => {update(blog.id)}}>like</button><br></br>
        added by {user.name}<br></br>
        {
          currentUser.username !== user.username ?
            null :
            <div>
              <button onClick={() => {remove(blog.id, blog.title, blog.author)}}>remove</button>
            </div>
        }
      </div>
    </div>
  )
}

export default Blog