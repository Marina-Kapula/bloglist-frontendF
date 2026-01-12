// src/components/Blog.jsx
// Компонент одного блогу: показує коротко/детально, лайки, видалення

import { useState } from 'react'

// 5.7–5.11: Blog-компонент
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

  // 5.11: показуємо remove тільки якщо блог створив поточний користувач
  const isOwner =
    blog.user &&
    (blog.user.username === currentUser.username ||
      blog.user.name === currentUser.name)

  return (
    <div style={blogStyle} className="blog">
      {/* короткий вигляд: тільки назва й автор */}
      <div style={detailsHidden} className="blog-summary">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>

      {/* детальний вигляд: url, лайки, автор, кнопка remove */}
      <div style={detailsVisible} className="blog-details">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
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
