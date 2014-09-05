# cssPrefix

CSS Prefixer for JavaScript code.

The small snipet that get or set vendor-prefixed CSS property or CSS value.  
This is not pre-compiler for CSS Style Sheet, this is used for handling those in JavaScript code.

## Methods

`getStyleProp` method and `setStyleValue` method are provided to global scope (i.e. window).

### `getStyleProp`

```js
property = getStyleProp(wantedProperty, elment)
```

Return the vendor-prefixed CSS property, or original property that doesn't require vendor-prefix. If nothing was found, the empty string is returned.

Example:

```js
property = getStyleProp('animation', elment);
console.log(property); // -> "webkitAnimation" on Chrome, "animation" on Firefox

property = getStyleProp('columnWidth', elment);
console.log(property); // -> "webkitColumnWidth" on Chrome, "MozColumnWidth" on Firefox
```

### `setStyleValue`

```js
value = setStyleValue(elment, property, wantedValue[, alt])
```

Try to set CSS value, and return the vendor-prefixed CSS value, or original value that doesn't require vendor-prefix. If `alt` is specified, also try it. If nothing could set, the empty string is returned.

Example:

```js
value = setStyleValue(elment, 'display', 'inline-grid', 'block');
console.log(value); // -> "block" (alt) on Chrome, "-moz-inline-grid" on Firefox

value = setStyleValue(elment, 'listStyleType', 'arabic-indic');
console.log(value); // -> "arabic-indic" on Chrome, "-moz-arabic-indic" on Firefox
```

## History
 * 2014-09-05			v0.1.0			Initial release.
