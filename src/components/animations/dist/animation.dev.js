"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thumbnailVariants = exports.transition = exports.animationThree = exports.animationTwo = exports.animationOne = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var animationOne = {
  "in": {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};
exports.animationOne = animationOne;
var animationTwo = {
  "in": {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: "-100vh",
    scale: 0.3
  }
};
exports.animationTwo = animationTwo;
var animationThree = {
  "in": {
    opacity: 1,
    x: -300
  },
  out: {
    opacity: 0,
    x: 300
  },
  end: {
    x: 0,
    opacity: 1
  }
};
exports.animationThree = animationThree;
var transition = {
  duration: 0.4
};
exports.transition = transition;
var thumbnailVariants = {
  initial: {
    scale: 0.9,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: transition
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: _objectSpread({
      duration: 1.5
    }, transition)
  }
};
exports.thumbnailVariants = thumbnailVariants;