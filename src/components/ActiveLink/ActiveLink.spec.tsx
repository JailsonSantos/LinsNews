import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

// Category of testss
describe('ActiveLink component', () => {
  // First option tests (MELHOR OPÇÃO)
  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    //debug()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  // Second options tests (SEGUNDA MELHOR OPÇÃO)
  test('adds active class if the link as currently active', () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    //debug() mostra a dom HTML do log
    expect(getByText('Home')).toHaveClass('active');
  })
})