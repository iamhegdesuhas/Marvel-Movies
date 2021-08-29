import "../../scss/SearchPage.scss";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../../utils/commonJsUtils";
import { Trie } from "../SearchFunctions";
import { initialMovieList } from "../../DataStore/MovieList";

const Button = lazy(() => import("../../components/Button"));
const AutoSuggest = lazy(() => import("../../components/AutoSuggest"));
const DelayedComponent = lazy(
  () => import("../../components/DelayedComponent")
);

const SearchPage = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dataSetRef = useRef<Trie>(new Trie());

  /**
   * Get movie list available in local storage.Format it and store it as a trie in dataSetRef.
   * 
   * @todo see if it is feasible to store trie itself in local storage instead of array of movie names.
   * @todo store the search results in a hash map. How to invalidate/update cache can be discussed(is it instant update, can it have some delay etc..).
   */
  useEffect(() => {
    try {
      let dataSet = JSON.parse(localStorage.getItem("movieList") || "[]");
      if (!dataSet.length) {
        dataSet = initialMovieList;
        localStorage.setItem("movieList", JSON.stringify(dataSet));
      }
      const trie = new Trie();
      dataSet.forEach((word: string) => trie.add(word.toLowerCase()));
      dataSetRef.current = trie;
    } catch (error) {
      console.log("Error during formatting of local storage", error);
      dataSetRef.current = new Trie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSuggestion = useCallback(
    debounce(async (searchString: string, trie: Trie) => {
      const newSuggestion = trie.complete(searchString);
      trie.clear();
      setSuggestions(newSuggestion);
    }, 200),
    []
  );
  const handleOnChange = (e: any) => {
    const searchString = e.target.value.replace(/\s\s+/g, " ");
    setSearchString(searchString);
    if (searchString === "") setSuggestions([]); //immediately clear here if input is cleared
    debouncedSuggestion(searchString, dataSetRef.current);
  };
  const handleSelection = (valueSelected: string) => {
    setSearchString(valueSelected);
  };
  const handleKeyDown = (e: any) => {
    if (["ArrowRight", "ArrowDown"].includes(e.key) && suggestions.length) {
      let nextSelection = suggestions[0];
      const currentSelectedIndex = suggestions.findIndex(
        (ele) => ele === searchString
      );
      if (
        currentSelectedIndex >= 0 &&
        currentSelectedIndex < suggestions.length - 1
      ) {
        nextSelection = suggestions[currentSelectedIndex + 1];
      }
      setSearchString(nextSelection);
    } else if (e.key === "Enter") {
      handleOnClick();
    }
    return;
  };
  const handleOnClick = () => {
    window.open(`https://www.google.com/search?q=${searchString}`);
    setSearchString("");
    setSuggestions([]);
  };
  const handleAddNew = () => {
    const currentTrie = dataSetRef.current;
    currentTrie.add(searchString);
    currentTrie.print();
    dataSetRef.current = currentTrie;
    setSuggestions([searchString]);
    const itemInStorage = JSON.parse(localStorage.getItem("movieList") || "");
    itemInStorage.push(searchString);
    localStorage.setItem("movieList", JSON.stringify(itemInStorage));
  };
  const addNewEntry = () => {
    return (
      <DelayedComponent delay={1000}>
        <div className="no-results">
          <span>
            No matching results. Click on "Add Movie" button to add this movie
            to the list.
          </span>
          <div className="add-new-entry-btn">
            <Button label="Add Movie" handleOnClick={handleAddNew}></Button>
          </div>
        </div>
      </DelayedComponent>
    );
  };

  return (
    <div className="container">
      <div className="searchPageWrapper" data-testid="searchWrapper">
        <AutoSuggest
          value={searchString}
          suggestions={suggestions}
          handleOnChange={handleOnChange}
          handleKeyDown={handleKeyDown}
          onSelectionChange={handleSelection}
          placeHolder="Search for movies"
          onNoSuggestion={addNewEntry()}
        />
      </div>
      <div className="buttonContainer">
        <Button
          label="Search"
          handleOnClick={handleOnClick}
          disabled={!searchString.length}
          style={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;
