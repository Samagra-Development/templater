"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_final_form_1 = require("react-final-form");
/**
 * Reset the submission error when the corresponding field changes.
 * final-form doesn't do this by default.
 */
var useResetSubmitErrors = function () {
    var form = (0, react_final_form_1.useForm)();
    var prevValues = (0, react_1.useRef)(form.getState().values);
    (0, react_1.useEffect)(function () {
        var unsubscribe = form.subscribe(function (_a) {
            var values = _a.values;
            form.mutators.resetSubmitErrors({
                current: values,
                prev: prevValues.current,
            });
            prevValues.current = values;
        }, { values: true });
        return unsubscribe;
    }, [form]);
};
exports.default = useResetSubmitErrors;
