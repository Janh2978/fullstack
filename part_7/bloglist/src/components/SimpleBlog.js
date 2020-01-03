import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="titleAuthor">
      {blog.title} {blog.author}
    </div>
    <div className="likesOnclick">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog