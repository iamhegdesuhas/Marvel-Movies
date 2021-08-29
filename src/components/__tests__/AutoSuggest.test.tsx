import React, { Suspense } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AutoSuggest from "../AutoSuggest";

test("Renders <AutoSuggest> without error", async () => {
  let searchString = "";
  let suggestions = [];
  const handleOnChange = jest.fn();
  const handleKeyDown = jest.fn();
  const addNewEntry = jest.fn();
  const handleSelection = jest.fn();
  render(
    <Suspense fallback={<span>Loading...</span>}>
      <AutoSuggest
        value={searchString}
        suggestions={suggestions}
        handleOnChange={handleOnChange}
        handleKeyDown={handleKeyDown}
        onSelectionChange={handleSelection}
        placeHolder="Search for movies"
        onNoSuggestion={addNewEntry()}
      />
    </Suspense>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument(); //lazy loading
  await waitFor(() =>
    expect(screen.getByPlaceholderText("Search for movies")).toBeInTheDocument()
  );
});

test("On change event", async () => {
  let searchString = "";
  let suggestions = [];
  const handleOnChange = jest.fn();
  const handleKeyDown = jest.fn();
  const addNewEntry = jest.fn();
  const handleSelection = jest.fn();
  render(
    <Suspense fallback={<span>Loading...</span>}>
      <AutoSuggest
        value={searchString}
        suggestions={suggestions}
        handleOnChange={handleOnChange}
        handleKeyDown={handleKeyDown}
        onSelectionChange={handleSelection}
        placeHolder="Search for movies"
        onNoSuggestion={addNewEntry()}
      />
    </Suspense>
  );
  await waitFor(() => {
    const inputTag=screen.getByPlaceholderText("Search for movies")
    expect(inputTag).toBeInTheDocument();
    fireEvent.change(inputTag,{target: {value: 'iron man'}})
    expect(handleOnChange).toBeCalled();
  });
});

test("On selection event", async () => {
    let searchString = "iron";
    let suggestions = ["iron man","iron man 2"];
    const handleOnChange = jest.fn();
    const handleKeyDown = jest.fn();
    const addNewEntry = jest.fn();
    const handleSelection = jest.fn();
    render(
      <Suspense fallback={<span>Loading...</span>}>
        <AutoSuggest
          value={searchString}
          suggestions={suggestions}
          handleOnChange={handleOnChange}
          handleKeyDown={handleKeyDown}
          onSelectionChange={handleSelection}
          placeHolder="Search for movies"
          onNoSuggestion={addNewEntry()}
        />
      </Suspense>
    );
    await waitFor(() => {
      const inputTag=screen.getByPlaceholderText("Search for movies")
      expect(inputTag).toBeInTheDocument();
      const suggestionDiv=screen.getAllByTestId("suggestion")
      expect(suggestionDiv).toHaveLength(1);
      const suggestionRows=screen.getAllByTestId("suggestions-div")
      expect(suggestionRows).toHaveLength(2);
      fireEvent.click(suggestionRows[0])
      expect(handleSelection).toBeCalledWith("iron man")
    });
  });