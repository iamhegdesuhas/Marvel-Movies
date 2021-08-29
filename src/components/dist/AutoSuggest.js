"use strict";
exports.__esModule = true;
exports.AutoSuggest = void 0;
require("../scss/AutoSuggest.scss");
var InputBox_1 = require("./InputBox");
var InputSuggestion_1 = require("./InputSuggestion");
exports.AutoSuggest = function (props) {
    var suggestions = props.suggestions, handleOnChange = props.handleOnChange, handleKeyDown = props.handleKeyDown, onSelectionChange = props.onSelectionChange, value = props.value, placeHolder = props.placeHolder, onNoSuggestion = props.onNoSuggestion;
    return (React.createElement("div", { className: "autoSuggestPageWrapper" },
        React.createElement(InputBox_1.InputBox, { firstSuggestion: suggestions.length ? suggestions[0] : "", value: value, handleOnChange: handleOnChange, inputStyle: { borderStyle: "none", outline: "none", width: "100%", fontSize: 14, fontWeight: "bold" }, placeHolder: placeHolder, handleKeyDown: handleKeyDown }),
        React.createElement(InputSuggestion_1.InputSuggestion, { inputString: value, onSelectionChange: onSelectionChange, suggestions: suggestions, onNoSuggestion: onNoSuggestion })));
};
