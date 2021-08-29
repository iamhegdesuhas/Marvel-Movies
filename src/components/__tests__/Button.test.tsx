import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from "../Button"

test('Renders <Button> without error', async () => {
  const handleOnClick=jest.fn()
  render(<Button label="button label" handleOnClick={handleOnClick} />)
  const button=screen.getByText("button label")
  expect(button).toBeInTheDocument()
  fireEvent.click(button)
  expect(handleOnClick).toHaveBeenCalledTimes(1)
})