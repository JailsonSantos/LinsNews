import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

// Category of tests
describe('SignInButton component', () => {

  // First test
  it('renders correctly when user is not authenticated', () => {

    const useSessionMocked = mocked(useSession)

    // Testa apenas a primeira vez que o component é renderizado
    // ja o mockReturnValue testas todas as outras vezes que o component é renderizado
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton />
    )

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()

  })

  // Second test
  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'jhon.doe@example.com' }, expires: 'fake-expires' },
      false
    ])

    render(
      <SignInButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()

  })
})