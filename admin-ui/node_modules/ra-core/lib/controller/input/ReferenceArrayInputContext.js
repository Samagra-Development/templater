"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceArrayInputContext = void 0;
var react_1 = require("react");
/**
 * Context which provides access to the useReferenceArrayInput features.
 *
 * @example
 * const ReferenceArrayInput = ({ children }) => {
 *     const controllerProps = useReferenceArrayInputController();
 *     return (
 *         <ReferenceArrayInputContextProvider value={controllerProps}>
 *             {children}
 *         </ReferenceArrayInputContextProvider>
 *     )
 * }
 */
exports.ReferenceArrayInputContext = (0, react_1.createContext)(undefined);
