// src/components/Blogform.test.jsx
// Тест форми створення блогу (5.16)

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Blogform from './Blogform'

describe('<Blogform />', () => {
  it('викликає createBlog з правильними даними при створенні нового блогу', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<Blogform createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title')
    const authorInput = screen.getByPlaceholderText('write blog author')
    const urlInput = screen.getByPlaceholderText('write blog url')
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'Новий блог')
    await user.type(authorInput, 'Новий Автор')
    await user.type(urlInput, 'http://novyi-blog.com')
    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Новий блог',
      author: 'Новий Автор',
      url: 'http://novyi-blog.com',
    })
  })
})
