/*
 * CSSPrefix
 * https://github.com/anseki/cssprefix
 *
 * Copyright (c) 2018 anseki
 * Licensed under the MIT license.
 */

function ucf(text) { return text.substr(0, 1).toUpperCase() + text.substr(1); }

const PREFIXES = ['webkit', 'moz', 'ms', 'o'],
  NAME_PREFIXES = PREFIXES.reduce((prefixes, prefix) => {
    prefixes.push(prefix);
    prefixes.push(ucf(prefix));
    return prefixes;
  }, []),
  VALUE_PREFIXES = PREFIXES.map(prefix => `-${prefix}-`),

  /**
   * Get sample CSSStyleDeclaration.
   * @returns {CSSStyleDeclaration}
   */
  getDeclaration = (() => {
    let declaration;
    window.setDeclaration = newDec => { declaration = newDec; }; // [DEBUG/]
    return () => (declaration = declaration || document.createElement('div').style);
  })(),

  /**
   * Normalize name.
   * @param {} propName - A name that is normalized.
   * @returns {string} A normalized name.
   */
  normalizeName = (() => {
    const rePrefixedName = new RegExp('^(?:' + PREFIXES.join('|') + ')(.)', 'i'),
      reUc = /[A-Z]/;
    return propName => ((propName = (propName + '').replace(/\s/g, '')
      .replace(/-([\da-z])/gi, (str, p1) => p1.toUpperCase()) // camelCase
      // 'ms' and 'Ms' are found by rePrefixedName 'i' option
      .replace(rePrefixedName, (str, p1) => (reUc.test(p1) ? p1.toLowerCase() : str)) // Remove prefix
    ).toLowerCase() === 'float' ? 'cssFloat' : propName); // For old CSSOM
  })(),

  /**
   * Normalize value.
   * @param {} propValue - A value that is normalized.
   * @returns {string} A normalized value.
   */
  normalizeValue = (() => {
    const rePrefixedValue = new RegExp('^(?:' + VALUE_PREFIXES.join('|') + ')', 'i');
    return propValue =>
      (propValue != null ? (propValue + '') : '').replace(/\s/g, '').replace(rePrefixedValue, '');
  })(),

  /**
   * Polyfill for `CSS.supports`.
   * @param {string} propName - A name.
   * @param {string} propValue - A value.
   * @returns {boolean} `true` if given pair is accepted.
   */
  cssSupports = (() =>
    // return window.CSS && window.CSS.supports || ((propName, propValue) => {
    // `CSS.supports` doesn't find prefixed property.
    (propName, propValue) => {
      const declaration = getDeclaration();
      // In some browsers, `declaration[prop] = value` updates any property.
      propName = propName.replace(/[A-Z]/g, str => `-${str.toLowerCase()}`); // kebab-case
      declaration.setProperty(propName, propValue);
      return declaration.getPropertyValue(propName) === propValue;
    }
  )(),

  // Cache
  propNames = {},
  propValues = {};

// [DEBUG]
window.normalizeName = normalizeName;
window.normalizeValue = normalizeValue;
window.cssSupports = cssSupports;
// [/DEBUG]

function getName(propName) {
  propName = normalizeName(propName);
  if (propName && propNames[propName] == null) {
    window.getNameDone = 'get'; // [DEBUG/]
    const declaration = getDeclaration();

    if (declaration[propName] != null) { // Original
      propNames[propName] = propName;

    } else { // Try with prefixes
      const ucfName = ucf(propName);
      if (!NAME_PREFIXES.some(prefix => {
        const prefixed = prefix + ucfName;
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
  let res;

  if (!(propName = getName(propName))) { return res; } // Invalid property

  propValues[propName] = propValues[propName] || {};
  (Array.isArray(propValue) ? propValue : [propValue]).some(propValue => {
    propValue = normalizeValue(propValue);
    (window.getValueDone = window.getValueDone || []).push(propValue); // [DEBUG/]

    if (propValues[propName][propValue] != null) { // Cache
      if (propValues[propName][propValue] !== false) {
        res = propValues[propName][propValue];
        return true;
      }
      return false; // Continue to next value
    }
    window.getValueDone.push('get'); // [DEBUG/]

    if (cssSupports(propName, propValue)) { // Original
      res = propValues[propName][propValue] = propValue;
      return true;
    }

    if (VALUE_PREFIXES.some(prefix => { // Try with prefixes
      const prefixed = prefix + propValue;
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

const CSSPrefix = {
  getName,
  getValue
};

export default CSSPrefix;
