// src/components/Blog.jsx
import { useState } from 'react'

// 5.7–5.11: Blog-komponentti
const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
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

  // 5.11: показываем remove только если блог создал текущий пользователь
  const isOwner =
    blog.user &&
    (blog.user.username === currentUser.username ||
      blog.user.name === currentUser.name)

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

        {isOwner && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
