// src/components/Blog.jsx
import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {   // <‑ добавили handleLike
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const detailsVisible = { display: visible ? '' : 'none' }
  const detailsHidden = { display: visible ? 'none' : '' }

  return (
    <div style={blogStyle}>
      <div style={detailsHidden}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={detailsVisible}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes || 0}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
      </div>
    </div>
  )
}

export default Blog
