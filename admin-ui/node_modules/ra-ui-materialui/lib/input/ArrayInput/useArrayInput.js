"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArrayInput = void 0;
var react_1 = require("react");
var ArrayInputContext_1 = require("./ArrayInputContext");
/**
 * A hook to access an array input mutators and meta as provided by react-final-form-array.
 * Useful to create custom array input iterators.
 * @see {ArrayInput}
 * @see {@link https://github.com/final-form/react-final-form-arrays|react-final-form-array}
 */
var useArrayInput = function (props) {
    var context = (0, react_1.useContext)(ArrayInputContext_1.ArrayInputContext);
    var memo = (0, react_1.useMemo)(function () { return ({
        fields: props === null || props === void 0 ? void 0 : props.fields,
        meta: props === null || props === void 0 ? void 0 : props.meta,
    }); }, [props]);
    if ((props === null || props === void 0 ? void 0 : props.fields) && (props === null || props === void 0 ? void 0 : props.meta)) {
        return memo;
    }
    return context;
};
exports.useArrayInput = useArrayInput;
