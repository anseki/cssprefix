/*
 * cssPrefix
 * https://github.com/anseki/css-prefix
 *
 * export: getStyleProp, setStyleValue
 *
 * Copyright (c) 2014 anseki
 * Licensed under the MIT license.
 */

(function(undefined) {
  var PREFIXES = ['webkit', 'ms', 'moz', 'o'],
    PREFIXES_PROP = [], PREFIXES_VALUE = [],
    rePrefixesProp, rePrefixesValue,
    props = {}, values = {}; // cache

  function ucf(text) { return text.substr(0, 1).toUpperCase() + text.substr(1); }

  PREFIXES.forEach(function(prefix) {
    PREFIXES_PROP.push(prefix);
    PREFIXES_PROP.push(ucf(prefix));
    PREFIXES_VALUE.push('-' + prefix + '-');
  });

  rePrefixesProp = new RegExp('^(?:' + PREFIXES.join('|') + ')(.)', 'i');
  function removePrefixesProp(prop) {
    var reUc = /[A-Z]/;
    return prop.replace(rePrefixesProp, function(str, p1) {
      return reUc.test(p1) ? p1.toLowerCase() : str;
    });
  }

  rePrefixesValue = new RegExp('^(?:' + PREFIXES_VALUE.join('|') + ')', 'i');
  function removePrefixesValue(value) {
    return value.replace(rePrefixesValue, '');
  }

  window.getStyleProp = function(prop, elm) {
    var style, ucfProp;
    prop = removePrefixesProp(prop);
    if (props[prop] === undefined) {
      style = elm.style;

      if (style[prop] !== undefined) { // original
        props[prop] = prop;
      } else { // try with prefixes
        ucfProp = ucf(prop);
        if (!PREFIXES_PROP.some(function(prefix) {
              var prefixed = prefix + ucfProp;
              if (style[prefixed] !== undefined) {
                props[prop] = prefixed;
                return true;
              }
            })) {
          props[prop] = '';
        }
      }

    }
    return props[prop];
  };

  window.setStyleValue = function(elm, prop, value) {
    var res, style = elm.style,
      valueArray = Array.isArray(value) ? value : [value];

    function trySet(prop, value) {
      style[prop] = value;
      return style[prop] === value;
    }

    values[prop] = values[prop] || {};
    if (!valueArray.some(function(value) {
          value = removePrefixesValue(value);
          if (values[prop][value] === undefined) {

            if (trySet(prop, value)) { // original
              res = values[prop][value] = value;
              return true;
            } else if (PREFIXES_VALUE.some(function(prefix) { // try with prefixes
                  var prefixed = prefix + value;
                  if (trySet(prop, prefixed)) {
                    res = values[prop][value] = prefixed;
                    return true;
                  }
                })) {
              return true;
            } else {
              values[prop][value] = '';
              return; // continue to next value
            }

          } else if (values[prop][value]) {
            style[prop] = res = values[prop][value];
            return true;
          }
        })) {
      res = '';
    }
    return res;
  };
})();
