import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Blog from './Blog'

// testidata yhdelle blogille
const blog = {
  title: 'Testiblogi',
  author: 'Testikirjoittaja',
  url: 'http://example.com',
  likes: 5,
  user: {
    username: 'testuser',
    name: 'Testikäyttäjä',
    id: '123',
  },
}

// nykyinen kirjautunut käyttäjä (blogin omistaja)
const currentUser = {
  username: 'testuser',
  name: 'Testikäyttäjä',
}

describe('<Blog />', () => {
  // 5.13: Blog-komponentti näyttää oletuksena vain otsikon ja kirjoittajan
it('näyttää vain otsikon ja kirjoittajan oletuksena', () => {
  const { container } = render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleRemove={() => {}}
      currentUser={currentUser}
    />
  )

  const summary = container.querySelector('.blog-summary')
  expect(summary.textContent).toMatch(/Testiblogi[\s\S]*Testikirjoittaja/)

  const details = container.querySelector('.blog-details')
  expect(details.style.display).toBe('none')
})


  // 5.14: URL ja tykkäysten määrä näkyvät, kun view-nappia painetaan
  it('näyttää urlin ja tykkäysten määrän, kun view-nappia painetaan', async () => {
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

  // 5.15: like-handleria kutsutaan kahdesti, kun like-nappia painetaan kahdesti
  it('kutsuu like-handleria kaksi kertaa, kun like-nappia painetaan kahdesti', async () => {
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
