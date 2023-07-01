```typescript
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Notification from '../components/Notification'
import { notifications } from '../lib/notifications'

const server = setupServer(
  rest.get('/api/notifications', (req, res, ctx) => {
    return res(ctx.json({ notifications: notifications }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays notifications', async () => {
  render(<Notification />)

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('Notifications')
  expect(screen.getByRole('list')).toHaveTextContent('Task due soon')
})

test('handles server error', async () => {
  server.use(
    rest.get('/api/notifications', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Notification />)

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Failed to load notifications')
})
```