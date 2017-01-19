var CSSPrefix =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * CSSPrefix
 * https://github.com/anseki/css-prefix
 *
 * Copyright (c) 2017 anseki
 * Licensed under the MIT license.
 */

// *** Currently, this code except `export` is not ES2015. ***

var CSSPrefix,
    PREFIXES = ['webkit', 'ms', 'moz', 'o'],
    PREFIXES_PROP = [],
    PREFIXES_VALUE = [],
    rePrefixesProp,
    rePrefixesValue,
    props = {},
    values = {}; // cache

function ucf(text) {
  return text.substr(0, 1).toUpperCase() + text.substr(1);
}

PREFIXES.forEach(function (prefix) {
  PREFIXES_PROP.push(prefix);
  PREFIXES_PROP.push(ucf(prefix));
  PREFIXES_VALUE.push('-' + prefix + '-');
});

rePrefixesProp = new RegExp('^(?:' + PREFIXES.join('|') + ')(.)', 'i');
function normalizeProp(prop) {
  var reUc = /[A-Z]/;
  // 'ms' and 'Ms' are found by rePrefixesProp. 'i' option
  return (prop = prop.replace(/-([\da-z])/gi, function (str, p1) {
    // camelCase
    return p1.toUpperCase();
  }).replace(rePrefixesProp, function (str, p1) {
    return reUc.test(p1) ? p1.toLowerCase() : str;
  })).toLowerCase() === 'float' ? 'cssFloat' : prop; // for old CSSOM
}

rePrefixesValue = new RegExp('^(?:' + PREFIXES_VALUE.join('|') + ')', 'i');
function normalizeValue(value) {
  return value.replace(rePrefixesValue, '');
}

function getProp(prop, elm) {
  var style, ucfProp;
  prop = normalizeProp(prop);
  if (props[prop] == null) {
    style = elm.style;

    if (style[prop] != null) {
      // original
      props[prop] = prop;
    } else {
      // try with prefixes
      ucfProp = ucf(prop);
      if (!PREFIXES_PROP.some(function (prefix) {
        var prefixed = prefix + ucfProp;
        if (style[prefixed] != null) {
          props[prop] = prefixed;
          return true;
        }
        return false;
      })) {
        props[prop] = '';
      }
    }
  }
  return props[prop];
}

function setValue(elm, prop, value) {
  var res,
      style = elm.style,
      valueArray = Array.isArray(value) ? value : [value];

  function trySet(prop, value) {
    style[prop] = value;
    return style[prop] === value;
  }

  if (!(prop = getProp(prop, elm))) {
    return '';
  } // Invalid Property
  values[prop] = values[prop] || {};
  if (!valueArray.some(function (value) {
    value = normalizeValue(value);
    if (values[prop][value] == null) {

      if (trySet(prop, value)) {
        // original
        res = values[prop][value] = value;
        return true;
      } else if (PREFIXES_VALUE.some(function (prefix) {
        // try with prefixes
        var prefixed = prefix + value;
        if (trySet(prop, prefixed)) {
          res = values[prop][value] = prefixed;
          return true;
        }
        return false;
      })) {
        return true;
      } else {
        values[prop][value] = '';
        return false; // continue to next value
      }
    } else if (values[prop][value]) {
      style[prop] = res = values[prop][value];
      return true;
    }
    return false;
  })) {
    res = '';
  }
  return res;
}

CSSPrefix = {
  getProp: getProp,
  setValue: setValue
};

exports.default = CSSPrefix;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cssPrefix = __webpack_require__(0);

var _cssPrefix2 = _interopRequireDefault(_cssPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.getStyleProp = _cssPrefix2.default.getProp; /*
                                                    * Old APIs: getStyleProp, setStyleValue
                                                    */

window.setStyleValue = _cssPrefix2.default.setValue;
exports.default = _cssPrefix2.default;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=css-prefix.js.map