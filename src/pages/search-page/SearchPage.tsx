import "../../scss/SearchPage.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { AutoSuggest } from "../../components/AutoSuggest";
import { Button } from "../../components/Button";
import { debounce } from "../../utils/commonJsUtils";
import { DelayedComponent } from "../../components/DelayedComponent";
import { Trie } from "../SearchFunctions";

export const SearchPage = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const trie = new Trie();
  const dataSetRef = useRef(trie);
  useEffect(() => {
    let dataSet = JSON.parse(localStorage.getItem("movieList"));
    dataSet.forEach((word) => trie.add(word.toLowerCase()));
    dataSetRef.current = trie;
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
    const itemInStorage=JSON.parse(localStorage.getItem("movieList"))
    itemInStorage.push(searchString)
    localStorage.setItem("movieList",JSON.stringify(itemInStorage))
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
      <div className="searchPageWrapper">
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
          style={{backgroundColor:"white",color:"black",fontWeight:"bold"}}
        />
      </div>
    </div>
  );
};
