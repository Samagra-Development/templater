"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var listActions_1 = require("../actions/listActions");
var defaultRecords = [];
/**
 * Get the list of selected items for a resource, and callbacks to change the selection
 *
 * @param resource The resource name, e.g. 'posts'
 *
 * @returns {Object} Destructure as [selectedIds, { select, toggle, clearSelection }].
 */
var useRecordSelection = function (resource) {
    var dispatch = (0, react_redux_1.useDispatch)();
    var selectedIds = (0, react_redux_1.useSelector)(function (reduxState) {
        return reduxState.admin.resources[resource]
            ? reduxState.admin.resources[resource].list.selectedIds
            : defaultRecords;
    }, react_redux_1.shallowEqual);
    var selectionModifiers = (0, react_1.useMemo)(function () { return ({
        select: function (newIds) {
            dispatch((0, listActions_1.setListSelectedIds)(resource, newIds));
        },
        toggle: function (id) {
            dispatch((0, listActions_1.toggleListItem)(resource, id));
        },
        clearSelection: function () {
            dispatch((0, listActions_1.setListSelectedIds)(resource, []));
        },
    }); }, [dispatch, resource]);
    return [selectedIds, selectionModifiers];
};
exports.default = useRecordSelection;
