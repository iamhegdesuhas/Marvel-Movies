"use strict";
exports.__esModule = true;
exports.DelayedComponent = void 0;
var react_1 = require("react");
exports.DelayedComponent = function (_a) {
    var children = _a.children, _b = _a.delay, delay = _b === void 0 ? 500 : _b;
    var _c = react_1.useState(false), isShown = _c[0], setIsShown = _c[1];
    react_1.useEffect(function () {
        setTimeout(function () {
            setIsShown(true);
        }, delay);
    }, [delay]);
    return isShown ? children : null;
};
