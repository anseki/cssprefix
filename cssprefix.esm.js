/* ================================================
        DON'T MANUALLY EDIT THIS FILE
================================================ */

/*
 * CSSPrefix
 * https://github.com/anseki/cssprefix
 *
 * Copyright (c) 2021 anseki
 * Licensed under the MIT license.
 */
function ucf(text) {
  return text.substr(0, 1).toUpperCase() + text.substr(1);
}

var PREFIXES = ['webkit', 'moz', 'ms', 'o'],
    NAME_PREFIXES = PREFIXES.reduce(function (prefixes, prefix) {
  prefixes.push(prefix);
  prefixes.push(ucf(prefix));
  return prefixes;
}, []),
    VALUE_PREFIXES = PREFIXES.map(function (prefix) {
  return "-".concat(prefix, "-");
}),

/**
 * Get sample CSSStyleDeclaration.
 * @returns {CSSStyleDeclaration}
 */
getDeclaration = function () {
  var declaration;
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
    return (propValue != null ? propValue + '' : '').replace(/\s/g, '').replace(rePrefixedValue, '');
  };
}(),

/**
 * Polyfill for `CSS.supports`.
 * @param {string} propName - A name.
 * @param {string} propValue - A value.
 *     Since `CSSStyleDeclaration.setProperty` might return unexpected result,
 *     the `propValue` should be checked before the `cssSupports` is called.
 * @returns {boolean} `true` if given pair is accepted.
 */
cssSupports = function () {
  return (// return window.CSS && window.CSS.supports || ((propName, propValue) => {
    // `CSS.supports` doesn't find prefixed property.
    function (propName, propValue) {
      var declaration = getDeclaration(); // In some browsers, `declaration[prop] = value` updates any property.

      propName = propName.replace(/[A-Z]/g, function (str) {
        return "-".concat(str.toLowerCase());
      }); // kebab-case

      declaration.setProperty(propName, propValue);
      return declaration[propName] != null && // Because getPropertyValue returns '' if it is unsupported
      declaration.getPropertyValue(propName) === propValue;
    }
  );
}(),
    // Cache
propNames = {},
    propValues = {};

function getName(propName) {
  propName = normalizeName(propName);

  if (propName && propNames[propName] == null) {
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
  var res;

  if (!(propName = getName(propName))) {
    return res;
  } // Invalid property


  propValues[propName] = propValues[propName] || {};
  (Array.isArray(propValue) ? propValue : [propValue]).some(function (propValue) {
    propValue = normalizeValue(propValue);

    if (propValues[propName][propValue] != null) {
      // Cache
      if (propValues[propName][propValue] !== false) {
        res = propValues[propName][propValue];
        return true;
      }

      return false; // Continue to next value
    }

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
export default CSSPrefix;