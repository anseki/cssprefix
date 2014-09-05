/*
 * cssPrefix
 * https://github.com/anseki/css-prefix
 *
 * Copyright (c) 2014 anseki
 * Licensed under the MIT license.
 */

/* exported getStyleProp,setStyleValue */

(function(undefined) {
  var PREFIXES = ['webkit', 'ms', 'moz', 'o'],
    PREFIXES_PROP = [], PREFIXES_VALUE = [],
    props = {}, values = {}; // cache

  function ucf(text) { return text.substr(0, 1).toUpperCase() + text.substr(1); }

  PREFIXES.forEach(function(prefix) {
    PREFIXES_PROP.push(prefix);
    PREFIXES_PROP.push(ucf(prefix));
    PREFIXES_VALUE.push('-' + prefix + '-');
  });

  window.getStyleProp = function(prop, elm) {
    var style, ucfProp;
    if (props[prop] === undefined) {
      style = elm.style;

      if (style[prop] !== undefined) { // original
        props[prop] = prop;
      } else { // try with prefixes
        ucfProp = ucf(prop);
        if (!PREFIXES_PROP.some(function(prefix) {
            if (style[prefix + ucfProp] !== undefined) {
              props[prop] = prefix + ucfProp;
              return true;
            }
          })) { props[prop] = ''; }
      }

    }
    return props[prop];
  };

  window.setStyleValue = function(elm, prop, value, alt) {
    var style = elm.style;

    function trySet(prop, value) {
      style[prop] = value;
      return style[prop] === value;
    }

    if (!values[prop] || values[prop][value] === undefined) {
      values[prop] = values[prop] || {};

      if (trySet(prop, value)) { // original
        values[prop][value] = value;
      } else if (!PREFIXES_VALUE.some(function(prefix) { // try with prefixes
            if (trySet(prop, prefix + value)) {
              values[prop][value] = prefix + value;
              return true;
            }
          })) {
        values[prop][value] = alt && trySet(prop, alt) ? alt : '';
      }

    } else if (values[prop][value]) { style[prop] = values[prop][value]; }
    return values[prop][value];
  };
})();
