import React from 'react'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import InputSuggestion from "../InputSuggestion"

test('Renders <InputSuggestion> without error', async () => {
  const onSelectionChange=jest.fn()
  render(<InputSuggestion suggestions={["iron man","iron man 2"]} inputString={"iron man"} onSelectionChange={onSelectionChange} />)
  const suggestionRows=screen.getAllByTestId("suggestions-div")
  expect(suggestionRows).toHaveLength(2)
  fireEvent.click(suggestionRows[1])
  expect(onSelectionChange).toHaveBeenCalledTimes(1)
})

test('Renders <InputSuggestion> without suggestions', async () => {
    const onSelectionChange=jest.fn()
    render(<InputSuggestion suggestions={[]} inputString={"iron man"} onSelectionChange={onSelectionChange} onNoSuggestion={<div data-testid="no-suggestion">no suggestion</div>} />)
    await waitFor(() => {
        const noSuggestion=screen.getByTestId("no-suggestion")
        expect(noSuggestion).toBeInTheDocument()
    })
  })