"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = __importDefault(require("lodash/merge"));
function getFormInitialValues(initialValues, defaultValue, record) {
    if (typeof defaultValue !== 'undefined') {
        console.warn('"defaultValue" is deprecated, please use "initialValues" instead');
    }
    var finalInitialValues = (0, merge_1.default)({}, getValues(defaultValue, record), getValues(initialValues, record), record);
    return finalInitialValues;
}
exports.default = getFormInitialValues;
function getValues(values, record) {
    if (typeof values === 'object') {
        return values;
    }
    if (typeof values === 'function') {
        return values(record);
    }
    return {};
}
