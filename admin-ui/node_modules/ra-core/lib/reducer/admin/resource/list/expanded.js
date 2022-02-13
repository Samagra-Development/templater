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
var listActions_1 = require("../../../../actions/listActions");
var initialState = [];
var expanded = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === listActions_1.TOGGLE_LIST_ITEM_EXPAND) {
        var index = previousState
            .map(function (el) { return el == action.payload; }) // eslint-disable-line eqeqeq
            .indexOf(true);
        if (index === -1) {
            // expand
            return __spreadArray(__spreadArray([], previousState, true), [action.payload], false);
        }
        else {
            // close
            return __spreadArray(__spreadArray([], previousState.slice(0, index), true), previousState.slice(index + 1), true);
        }
    }
    return previousState;
};
exports.default = expanded;
