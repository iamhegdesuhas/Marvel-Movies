"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SearchPage = void 0;
require("../../scss/SearchPage.scss");
var react_1 = require("react");
var AutoSuggest_1 = require("../../components/AutoSuggest");
var Button_1 = require("../../components/Button");
var commonJsUtils_1 = require("../../utils/commonJsUtils");
var DelayedComponent_1 = require("../../components/DelayedComponent");
var SearchFunctions_1 = require("../SearchFunctions");
exports.SearchPage = function () {
    var _a = react_1.useState(""), searchString = _a[0], setSearchString = _a[1];
    var _b = react_1.useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var trie = new SearchFunctions_1.Trie();
    var dataSetRef = react_1.useRef(trie);
    react_1.useEffect(function () {
        var dataSet = JSON.parse(localStorage.getItem("movieList"));
        dataSet.forEach(function (word) { return trie.add(word.toLowerCase()); });
        dataSetRef.current = trie;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var debouncedSuggestion = react_1.useCallback(commonJsUtils_1.debounce(function (searchString, trie) { return __awaiter(void 0, void 0, void 0, function () {
        var newSuggestion;
        return __generator(this, function (_a) {
            newSuggestion = trie.complete(searchString);
            trie.clear();
            setSuggestions(newSuggestion);
            return [2 /*return*/];
        });
    }); }, 200), []);
    var handleOnChange = function (e) {
        var searchString = e.target.value.replace(/\s\s+/g, " ");
        setSearchString(searchString);
        if (searchString === "")
            setSuggestions([]); //immediately clear here if input is cleared
        debouncedSuggestion(searchString, dataSetRef.current);
    };
    var handleSelection = function (valueSelected) {
        setSearchString(valueSelected);
    };
    var handleKeyDown = function (e) {
        if (["ArrowRight", "ArrowDown"].includes(e.key) && suggestions.length) {
            var nextSelection = suggestions[0];
            var currentSelectedIndex = suggestions.findIndex(function (ele) { return ele === searchString; });
            if (currentSelectedIndex >= 0 &&
                currentSelectedIndex < suggestions.length - 1) {
                nextSelection = suggestions[currentSelectedIndex + 1];
            }
            setSearchString(nextSelection);
        }
        else if (e.key === "Enter") {
            handleOnClick();
        }
        return;
    };
    var handleOnClick = function () {
        window.open("https://www.google.com/search?q=" + searchString);
        setSearchString("");
        setSuggestions([]);
    };
    var handleAddNew = function () {
        var currentTrie = dataSetRef.current;
        currentTrie.add(searchString);
        currentTrie.print();
        dataSetRef.current = currentTrie;
        setSuggestions([searchString]);
        var itemInStorage = JSON.parse(localStorage.getItem("movieList"));
        itemInStorage.push(searchString);
        localStorage.setItem("movieList", JSON.stringify(itemInStorage));
    };
    var addNewEntry = function () {
        return (React.createElement(DelayedComponent_1.DelayedComponent, { delay: 1000 },
            React.createElement("div", { className: "no-results" },
                React.createElement("span", null, "No matching results. Click on \"Add Movie\" button to add this movie to the list."),
                React.createElement("div", { className: "add-new-entry-btn" },
                    React.createElement(Button_1.Button, { label: "Add Movie", handleOnClick: handleAddNew })))));
    };
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "searchPageWrapper" },
            React.createElement(AutoSuggest_1.AutoSuggest, { value: searchString, suggestions: suggestions, handleOnChange: handleOnChange, handleKeyDown: handleKeyDown, onSelectionChange: handleSelection, placeHolder: "Search for movies", onNoSuggestion: addNewEntry() })),
        React.createElement("div", { className: "buttonContainer" },
            React.createElement(Button_1.Button, { label: "Search", handleOnClick: handleOnClick, disabled: !searchString.length, style: { backgroundColor: "white", color: "black", fontWeight: "bold" } }))));
};
