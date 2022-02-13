"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("history");
var resolveRedirectTo_1 = __importDefault(require("../util/resolveRedirectTo"));
var uiActions_1 = require("../actions/uiActions");
/**
 * Hook for Redirection Side Effect
 *
 * @example
 *
 * const redirect = useRedirect();
 * // redirect to list view
 * redirect('list', '/posts');
 * // redirect to edit view
 * redirect('edit', '/posts', 123);
 * // redirect to edit view with state data
 * redirect('edit', '/comment', 123, {}, { record: { post_id: record.id } });
 * // do not redirect (resets the record form)
 * redirect(false);
 * // redirect to the result of a function
 * redirect((redirectTo, basePath, id, data) => ...)
 */
var useRedirect = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var history = (0, react_router_dom_1.useHistory)(); // Note: history is mutable. This prevents render loops in useCallback.
    return (0, react_1.useCallback)(function (redirectTo, basePath, id, data, state) {
        if (basePath === void 0) { basePath = ''; }
        if (state === void 0) { state = {}; }
        if (!redirectTo) {
            if (history.location.state || history.location.search) {
                history.replace(__assign(__assign({}, history.location), { state: state, search: undefined }));
            }
            else {
                dispatch((0, uiActions_1.refreshView)());
            }
            return;
        }
        if (typeof redirectTo === 'string' &&
            redirectTo.startsWith('http') &&
            window) {
            // redirection to an absolute url
            // history doesn't handle that case, so we handle it by hand
            window.location.href = redirectTo;
        }
        else {
            history.push(__assign(__assign({}, (0, history_1.parsePath)((0, resolveRedirectTo_1.default)(redirectTo, basePath, id, data))), { state: __assign({ _scrollToTop: true }, state) }));
        }
    }, [dispatch, history]);
};
exports.default = useRedirect;
