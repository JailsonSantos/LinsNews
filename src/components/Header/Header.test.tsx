import { render, screen } from '@testing-library/react'
import { Header } from '.'

// Em tests unitários, quando um component precisar testar uma funcionalidade externa
// Deve-se fazer um mock e fazer um retorno fictício
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

// Category of tests
describe('Header component', () => {

  // First option tests
  it('renders correctly', () => {
    render(
      <Header />
    )

    screen.logTestingPlaygroundURL()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})