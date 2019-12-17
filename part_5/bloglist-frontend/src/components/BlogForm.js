import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  onSubmit,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={onSubmit}>
        title:
        <input {...title.input} /><br></br>
        author:
        <input {...author.input} /><br></br>
        url:
        <input {...url.input} /><br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.object,
  author: PropTypes.object,
  url: PropTypes.object,
}

export default BlogForm