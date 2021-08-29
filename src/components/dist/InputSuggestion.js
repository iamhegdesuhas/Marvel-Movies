"use strict";
exports.__esModule = true;
exports.InputSuggestion = void 0;
require("../scss/InputSuggestion.scss");
exports.InputSuggestion = function (props) {
    var suggestions = props.suggestions, inputString = props.inputString, onNoSuggestion = props.onNoSuggestion, onSelectionChange = props.onSelectionChange;
    if (!suggestions.length) {
        if (inputString.length > 1 && onNoSuggestion) {
            return onNoSuggestion;
        }
        return null;
    }
    return (React.createElement("div", { className: "suggestion" }, suggestions.map(function (ele, index) { return (React.createElement("div", { key: index, className: "suggestion-item", onClick: function () {
            onSelectionChange(ele);
        }, style: ele === inputString
            ? { backgroundColor: "rgba(199, 222, 233, 0.746)" }
            : {} },
        React.createElement("span", null, ele))); })));
};
