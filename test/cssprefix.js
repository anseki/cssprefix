var CSSPrefix =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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
 * https://github.com/anseki/cssprefix
 *
 * Copyright (c) 2018 anseki
 * Licensed under the MIT license.
 */

function ucf(text) {
  return text.substr(0, 1).toUpperCase() + text.substr(1);
}

var PREFIXES = ['webkit', 'ms', 'moz', 'o'],
    NAME_PREFIXES = PREFIXES.reduce(function (prefixes, prefix) {
  prefixes.push(prefix);
  prefixes.push(ucf(prefix));
  return prefixes;
}, []),
    VALUE_PREFIXES = PREFIXES.map(function (prefix) {
  return '-' + prefix + '-';
}),


/**
 * Get sample CSSStyleDeclaration.
 * @returns {CSSStyleDeclaration}
 */
getDeclaration = function () {
  var declaration = void 0;
  return function () {
    return declaration = declaration || document.createElement('div').style;
  };
}(),


/**
 * Normalize name.
 * @param {} propName - A name that is normalized.
 * @returns {string} A normalized name.
 */
normalizeName = function () {
  var rePrefixedName = new RegExp('^(?:' + PREFIXES.join('|') + ')(.)', 'i'),
      reUc = /[A-Z]/;
  return function (propName) {
    return (propName = (propName + '').replace(/\s/g, '').replace(/-([\da-z])/gi, function (str, p1) {
      return p1.toUpperCase();
    }) // camelCase
    // 'ms' and 'Ms' are found by rePrefixedName 'i' option
    .replace(rePrefixedName, function (str, p1) {
      return reUc.test(p1) ? p1.toLowerCase() : str;
    }) // Remove prefix
    ).toLowerCase() === 'float' ? 'cssFloat' : propName;
  }; // For old CSSOM
}(),


/**
 * Normalize value.
 * @param {} propValue - A value that is normalized.
 * @returns {string} A normalized value.
 */
normalizeValue = function () {
  var rePrefixedValue = new RegExp('^(?:' + VALUE_PREFIXES.join('|') + ')', 'i');
  return function (propValue) {
    return (propValue + '').replace(/\s/g, '').replace(rePrefixedValue, '');
  };
}(),


/**
 * Polyfill for `CSS.supports`.
 * @param {string} propName - A name.
 * @param {string} propValue - A value.
 * @returns {boolean} `true` if given pair is accepted.
 */
cssSupports = function () {
  // return window.CSS && window.CSS.supports || ((propName, propValue) => {
  // `CSS.supports` doesn't find prefixed property.
  return function (propName, propValue) {
    var declaration = getDeclaration();
    // In some browsers, `declaration[prop] = value` updates any property.
    propName = propName.replace(/[A-Z]/g, function (str) {
      return '-' + str.toLowerCase();
    }); // kebab-case
    declaration.setProperty(propName, propValue);
    return declaration.getPropertyValue(propName) === propValue;
  };
}(),
    propNames = {},
    propValues = {}; // Cache

// [DEBUG]
window.normalizeName = normalizeName;
window.normalizeValue = normalizeValue;
window.cssSupports = cssSupports;
// [/DEBUG]

function getName(propName) {
  propName = normalizeName(propName);
  if (propName && propNames[propName] == null) {
    window.getNameDone = 'get'; // [DEBUG/]
    var declaration = getDeclaration();

    if (declaration[propName] != null) {
      // Original
      propNames[propName] = propName;
    } else {
      // Try with prefixes
      var ucfName = ucf(propName);
      if (!NAME_PREFIXES.some(function (prefix) {
        var prefixed = prefix + ucfName;
        if (declaration[prefixed] != null) {
          propNames[propName] = prefixed;
          return true;
        }
        return false;
      })) {
        propNames[propName] = false;
      }
    }
  }
  return propNames[propName] || void 0;
}

function getValue(propName, propValue) {
  var res = void 0;

  if (!(propName = getName(propName))) {
    return res;
  } // Invalid property

  propValues[propName] = propValues[propName] || {};
  (Array.isArray(propValue) ? propValue : [propValue]).some(function (propValue) {
    propValue = normalizeValue(propValue);
    (window.getValueDone = window.getValueDone || []).push(propValue); // [DEBUG/]

    if (propValues[propName][propValue] != null) {
      // Cache
      if (propValues[propName][propValue] !== false) {
        res = propValues[propName][propValue];
        return true;
      } else {
        return false; // Continue to next value
      }
    }
    window.getValueDone.push('get'); // [DEBUG/]

    if (cssSupports(propName, propValue)) {
      // Original
      res = propValues[propName][propValue] = propValue;
      return true;
    }

    if (VALUE_PREFIXES.some(function (prefix) {
      // Try with prefixes
      var prefixed = prefix + propValue;
      if (cssSupports(propName, prefixed)) {
        res = propValues[propName][propValue] = prefixed;
        return true;
      }
      return false;
    })) {
      return true;
    }

    propValues[propName][propValue] = false;
    return false; // Continue to next value
  });

  return typeof res === 'string' ? res : void 0; // It might be empty string.
}

var CSSPrefix = {
  getName: getName,
  getValue: getValue
};

exports.default = CSSPrefix;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=cssprefix.js.map