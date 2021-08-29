import React, { Suspense } from 'react'
import {render, fireEvent, screen, waitFor, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchPage from "../search-page/SearchPage"
import { act } from 'react-dom/test-utils'
afterEach(() => {
    cleanup();
  });
test('Renders <SearchPage> without error', async () => {
  render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)
  await waitFor(()=>{
    const searchWrapper=screen.getByTestId("searchWrapper")
    expect(searchWrapper).toBeInTheDocument()
  })
})
test('Search button disabled', async () => {
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)
    await waitFor(()=>{
      const searchButton=screen.getByText("Search")
      expect(searchButton).toBeInTheDocument()
      expect(searchButton).toBeDisabled()
    })
  })
  test('Search button click', async () => {
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)

    await waitFor(()=>{
        const searchButton=screen.getByText("Search")
        const searchWrapper=screen.getByTestId("searchWrapper")
        expect(searchWrapper).toBeInTheDocument()
        const inputTag=screen.getByPlaceholderText("Search for movies")
        expect(inputTag).toBeInTheDocument()
        fireEvent.change(inputTag,{target:{value:"ir"}})
        const suggestionRows=screen.getAllByTestId("suggestions-div")
        expect(suggestionRows).toHaveLength(3);
        fireEvent.click(suggestionRows[0])
        fireEvent.click(searchButton)
    })
  })
  test('arrow key down', async () => {
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)

    await waitFor(()=>{
        const inputTag=screen.getByPlaceholderText("Search for movies")
        expect(inputTag).toBeInTheDocument()
        fireEvent.change(inputTag,{target:{value:"ir"}})
        const suggestionRows=screen.getAllByTestId("suggestions-div")
        expect(suggestionRows).toHaveLength(3);
        fireEvent.keyDown(inputTag, {key: 'ArrowRight', code: 'ArrowRight'})
    })
  })
  test('Enter pressed', async () => {
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)

    await waitFor(()=>{
        const inputTag=screen.getByPlaceholderText("Search for movies")
        expect(inputTag).toBeInTheDocument()
        fireEvent.change(inputTag,{target:{value:"ir"}})
        const suggestionRows=screen.getAllByTestId("suggestions-div")
        expect(suggestionRows).toHaveLength(3);
        fireEvent.keyDown(inputTag, {key: 'Enter', code: 'Enter'})
    })
  })
test('Searching in <SearchPage> without error', async () => {
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)
    await waitFor(()=>{
      const searchWrapper=screen.getByTestId("searchWrapper")
      expect(searchWrapper).toBeInTheDocument()
      const inputTag=screen.getByPlaceholderText("Search for movies")
      expect(inputTag).toBeInTheDocument()
      fireEvent.change(inputTag,{target:{value:"iron"}})
      const suggestionRows=screen.getAllByTestId("suggestions-div")
      expect(suggestionRows).toHaveLength(3);
      fireEvent.click(suggestionRows[0])
      fireEvent.change(inputTag,{target:{value:""}})
    })
  })

  test('Adding new Movie', async () => {
    jest.useFakeTimers();
    render(<Suspense fallback={<div>Loading...</div>}><SearchPage /></Suspense>)
    await waitFor(()=>{
      const inputTag=screen.getByPlaceholderText("Search for movies")
      expect(inputTag).toBeInTheDocument()
      fireEvent.change(inputTag,{target:{value:"abcdefg"}})
      act(() => {
        jest.advanceTimersByTime(2000);
      })
      const button=screen.getByText("Add Movie")
      expect(button).toBeInTheDocument()
      fireEvent.click(button)    })
  })