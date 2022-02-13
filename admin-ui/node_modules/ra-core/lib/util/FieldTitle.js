"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTitle = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var useTranslate_1 = __importDefault(require("../i18n/useTranslate"));
var getFieldLabelTranslationArgs_1 = __importDefault(require("./getFieldLabelTranslationArgs"));
var FieldTitle = function (props) {
    var resource = props.resource, source = props.source, label = props.label, isRequired = props.isRequired;
    var translate = (0, useTranslate_1.default)();
    if (label === false || label === '') {
        return null;
    }
    if (label && typeof label !== 'string') {
        return label;
    }
    return (React.createElement("span", null,
        translate.apply(void 0, (0, getFieldLabelTranslationArgs_1.default)({
            label: label,
            resource: resource,
            source: source,
        })),
        isRequired && ' *'));
};
exports.FieldTitle = FieldTitle;
// What? TypeScript loses the displayName if we don't set it explicitly
exports.FieldTitle.displayName = 'FieldTitle';
exports.default = (0, react_1.memo)(exports.FieldTitle);
