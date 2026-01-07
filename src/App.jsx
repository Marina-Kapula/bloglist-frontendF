// src/App.jsx

// 5.1–5.6: App-komponentti

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/Blogform'      // 5.6
import Togglable from './components/Togglable'    // 5.5
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()                   // 5.5: ref формы

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // 5.2: Перевіряємо localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // 5.1: Login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // 5.2: Зберігаємо в localStorage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // 5.3: Logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // 5.6 + 5.5: Створення нового блогу
  const createBlog = async (blogObject) => {
    // сховаємо форму після створення
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  // 5.8: like-painikkeen toiminnallisuus
  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id || blog.user,        // backend хочет id юзера
      likes: (blog.likes || 0) + 1,
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
  }

  // 5.1: Якщо не залогінений - показуємо форму логіну
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  
return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {/* 5.10: сортировка блогов по количеству лайков (сначала больше всего) */}
      {blogs
        .slice()                                   // 5.10: не мутируем state
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .map(blog =>
          <Blog
            key={blog.id || blog._id}
            blog={blog}
            handleLike={handleLike}
          />
        )}

    </div>
  )
}

export default App
