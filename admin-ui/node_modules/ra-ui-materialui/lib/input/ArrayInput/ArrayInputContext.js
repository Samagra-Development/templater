"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayInputContext = void 0;
var react_1 = require("react");
/**
 * A React context that provides access to an ArrayInput mutators and meta as provided by react-final-form-array
 * Useful to create custom array input iterators.
 * @see {ArrayInput}
 * @see {@link https://github.com/final-form/react-final-form-arrays|react-final-form-array}
 */
exports.ArrayInputContext = (0, react_1.createContext)(undefined);
