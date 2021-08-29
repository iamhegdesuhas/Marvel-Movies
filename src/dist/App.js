"use strict";
exports.__esModule = true;
require("./scss/App.scss");
var SearchPage_1 = require("./pages/search-page/SearchPage");
function App() {
    return (React.createElement("div", { className: "mcu" },
        React.createElement("div", { className: "center" },
            React.createElement(SearchPage_1.SearchPage, null))));
}
exports["default"] = App;
