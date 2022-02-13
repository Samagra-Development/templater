"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReferenceArrayInputContext = void 0;
var react_1 = require("react");
var defaults_1 = __importDefault(require("lodash/defaults"));
var ReferenceArrayInputContext_1 = require("./ReferenceArrayInputContext");
/**
 * Hook to get the ReferenceArrayInputContext.
 */
var useReferenceArrayInputContext = function (props) {
    var context = (0, react_1.useContext)(ReferenceArrayInputContext_1.ReferenceArrayInputContext);
    // Props take precedence over the context
    return (0, react_1.useMemo)(function () {
        return (0, defaults_1.default)({}, props != null
            ? extractReferenceArrayInputContextProps(props)
            : {}, context);
    }, [context, props]);
};
exports.useReferenceArrayInputContext = useReferenceArrayInputContext;
var extractReferenceArrayInputContextProps = function (_a) {
    var choices = _a.choices, error = _a.error, loaded = _a.loaded, loading = _a.loading, setFilter = _a.setFilter, setPagination = _a.setPagination, setSort = _a.setSort, setSortForList = _a.setSortForList, warning = _a.warning;
    return ({
        choices: choices,
        error: error,
        loaded: loaded,
        loading: loading,
        setFilter: setFilter,
        setPagination: setPagination,
        setSort: setSort,
        setSortForList: setSortForList,
        warning: warning,
    });
};
