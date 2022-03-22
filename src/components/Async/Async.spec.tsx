import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello World')).toBeInTheDocument()

  /*  // Espera algo acontecer Exemplo 1
   await waitFor(async () => {
     return expect(screen.getByText('Button')).toBeInTheDocument()
   }) */

  /* // Espera algo acontecer Exemplo 2
  await waitFor(async () => {
    return expect(screen.queryByText('Button')).not.toBeInTheDocument()
  }) */

  // Espera algo acontece Exemplo 3
  await waitForElementToBeRemoved(screen.queryByText('Button'))
})