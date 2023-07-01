```typescript
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Project from '../components/Project'

const server = setupServer(
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.json({ title: 'Test Project', description: 'This is a test project', dueDate: '2022-12-31', status: 'In Progress' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays project', async () => {
  render(<Project />)

  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('Test Project')
  expect(screen.getByText('This is a test project')).toBeInTheDocument()
  expect(screen.getByText('Due Date: 2022-12-31')).toBeInTheDocument()
  expect(screen.getByText('Status: In Progress')).toBeInTheDocument()
})

test('handles server error', async () => {
  server.use(
    rest.get('/api/projects', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Project />)

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('Failed to load project')
})
```