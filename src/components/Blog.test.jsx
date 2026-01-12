

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Blog from './Blog'

// Тестові дані блогу
const blog = {
  title: 'Тестовий блог',
  author: 'Тестовий Автор',
  url: 'http://example.com',
  likes: 5,
  user: {
    username: 'testuser',
    name: 'Test User',
    id: '123',
  },
}

// Поточний користувач (власник блогу)
const currentUser = {
  username: 'testuser',
  name: 'Test User',
}

describe('<Blog />', () => {
  // 5.13
  it('відображає тільки назву та автора, але не url і лайки за замовчуванням', () => {
    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleRemove={() => {}}
        currentUser={currentUser}
      />
    )

    expect(
      screen.getByText('Тестовий блог Тестовий Автор')
    ).toBeDefined()

    const details = document.querySelector('.blog-details')
    expect(details).toHaveStyle('display: none')
  })

  // 5.14
  it('показує url та кількість лайків після натискання кнопки view', async () => {
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleRemove={() => {}}
        currentUser={currentUser}
      />
    )

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('http://example.com')).toBeDefined()
    expect(screen.getByText(/likes 5/)).toBeDefined()
  })

  // 5.15
  it('двічі викликає обробник лайків, якщо натиснути кнопку like двічі', async () => {
    const user = userEvent.setup()
    const mockLike = vi.fn()

    render(
      <Blog
        blog={blog}
        handleLike={mockLike}
        handleRemove={() => {}}
        currentUser={currentUser}
      />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike).toHaveBeenCalledTimes(2)
  })
})
