import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

// Category of tests
describe('SubscribeButton component', () => {
  // First test
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(
      <SubscribeButton />
    )
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  // Second Test
  it('redirects user to sign in when not authenticated', () => {

    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    // Dispara eventos
    const subscribeButton = screen.getByText('Subscribe now')

    // Verifica se ao clicar no subscribeButton chama o sign
    fireEvent.click(subscribeButton)
    expect(signInMocked).toHaveBeenCalled()
  })

  // Trusty test
  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        user:
        {
          name: 'John Doe',
          email: 'jhon.doe@example.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      } as any,
      false
    ])

    // Como só é usado o push do useRouter, para evitar erro to typescript usá-se o (as any)
    useRouterMocked.mockReturnValue({
      push: pushMocked
    } as any)

    render(
      <SubscribeButton />
    )

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})