```typescript
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignIn from '../components/SignIn'

describe('SignIn', () => {
  it('renders without crashing', () => {
    render(<SignIn />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('calls the signIn function when the form is submitted', async () => {
    const mockSignIn = jest.fn()
    render(<SignIn signIn={mockSignIn} />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByText('Sign In'))

    await waitFor(() => expect(mockSignIn).toHaveBeenCalledTimes(1))
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password')
  })

  it('shows an error message when signIn fails', async () => {
    const mockSignIn = jest.fn().mockRejectedValue(new Error('Sign In Failed'))
    render(<SignIn signIn={mockSignIn} />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByText('Sign In'))

    await waitFor(() => expect(screen.getByText('Sign In Failed')).toBeInTheDocument())
  })
})
```