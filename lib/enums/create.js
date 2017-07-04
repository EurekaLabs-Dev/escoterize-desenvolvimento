'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Enum;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Enum(values) {
  return values.reduce(function (obj, value) {
    return _ramda2.default.merge(obj, _defineProperty({}, value, value));
  }, {});
}