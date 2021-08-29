"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.InputBox = void 0;
var react_1 = require("react");
require("../scss/InputBox.scss");
exports.InputBox = function (props) {
    var firstSuggestion = props.firstSuggestion, value = props.value, handleOnChange = props.handleOnChange, handleKeyDown = props.handleKeyDown, inputStyle = props.inputStyle, placeHolder = props.placeHolder;
    var width = inputStyle.width, style = __rest(inputStyle, ["width"]);
    var _a = react_1.useState(false), focused = _a[0], setFocused = _a[1];
    var onFocus = function () { return setFocused(true); };
    var onBlur = function () { return setFocused(false); };
    var labelValue = value;
    if (firstSuggestion) {
        var firstHalf = value;
        var secondHalf = firstSuggestion.slice(value.length);
        labelValue = (React.createElement(React.Fragment, null,
            React.createElement("span", null, firstHalf),
            React.createElement("span", { style: { color: "#808080" } }, secondHalf)));
    }
    return (React.createElement("div", { className: "text-box" },
        React.createElement("input", { className: "input-tag", type: "text", id: "inputText", value: value, placeholder: placeHolder, autoComplete: "off", onChange: handleOnChange, onKeyDown: handleKeyDown, style: inputStyle, autoFocus: true, onFocus: onFocus, onBlur: onBlur }),
        React.createElement("label", { className: "input-tag-label", htmlFor: "inputText", style: style },
            labelValue,
            focused && React.createElement("span", { className: "blinking-cursor" }, "|"))));
};
