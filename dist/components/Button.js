"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Button = props => {
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn--".concat(props.kind, " CTA"),
    "data-id": props.id,
    type: props.type,
    name: props.name,
    value: props.value,
    disabled: props.disabled,
    onClick: props.handleClick
  }, /*#__PURE__*/_react.default.createElement("h4", null, props.label));
};
var _default = Button;
exports.default = _default;
const Title = _styledComponents.default.h1.withConfig({
  displayName: "Button__Title",
  componentId: "sc-14xms1s-0"
})(["font-size:1.5em;text-align:center;color:palevioletred;"]);