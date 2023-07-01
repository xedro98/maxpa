```typescript
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import SignUp from '../components/SignUp'

const server = setupServer(
  rest.post('/api/auth/signup', (req, res, ctx) => {
    return res(ctx.json({ status: 'success' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('allows the user to sign up successfully', async () => {
  render(<SignUp />)

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'testuser' },
  })
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'testuser@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'testpassword' },
  })

  fireEvent.click(screen.getByText(/sign up/i))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Signed up successfully')
})

test('handles server exceptions', async () => {
  server.use(
    rest.post('/api/auth/signup', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
    })
  )

  render(<SignUp />)

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'testuser' },
  })
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'testuser@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'testpassword' },
  })

  fireEvent.click(screen.getByText(/sign up/i))

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Internal server error')
})
```