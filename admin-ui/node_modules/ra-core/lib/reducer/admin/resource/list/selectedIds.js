"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../../../actions");
var core_1 = require("../../../../core");
var initialState = [];
var selectedIdsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === actions_1.SET_LIST_SELECTED_IDS) {
        return action.payload;
    }
    if (action.type === actions_1.TOGGLE_LIST_ITEM) {
        var index = previousState.indexOf(action.payload);
        if (index > -1) {
            return __spreadArray(__spreadArray([], previousState.slice(0, index), true), previousState.slice(index + 1), true);
        }
        else {
            return __spreadArray(__spreadArray([], previousState, true), [action.payload], false);
        }
    }
    if (action.type === actions_1.CRUD_DELETE_SUCCESS) {
        var index = previousState.indexOf(action.payload.data.id);
        if (index > -1) {
            return __spreadArray(__spreadArray([], previousState.slice(0, index), true), previousState.slice(index + 1), true);
        }
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === core_1.DELETE) {
            var index = previousState.indexOf(action.payload.id);
            if (index === -1) {
                return previousState;
            }
            return __spreadArray(__spreadArray([], previousState.slice(0, index), true), previousState.slice(index + 1), true);
        }
        if (action.meta.fetch === core_1.DELETE_MANY) {
            return previousState.filter(function (id) { return !action.payload.ids.includes(id); });
        }
    }
    return action.meta && action.meta.unselectAll
        ? initialState
        : previousState;
};
exports.default = selectedIdsReducer;
