"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var uiActions_1 = require("../actions/uiActions");
/**
 * Hook for Refresh Side Effect
 *
 * Returns a callback that triggers a page refresh. The callback causes a
 * version increase, which forces a re-execution all queries based on the
 * useDataProvider() hook, and a rerender of all components using the version
 * as key.
 *
 * @param hard If true, the callback empties the cache, too
 *
 * @example
 *
 * const refresh = useRefresh();
 * // soft refresh
 * refresh();
 * // hard refresh
 * refresh(true)
 */
var useRefresh = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(function (hard) {
        dispatch((0, uiActions_1.refreshView)(hard));
    }, [dispatch]);
};
exports.default = useRefresh;
