# cssPrefix

CSS Prefixer for JavaScript code.

The small snipet that get or set vendor-prefixed CSS property or CSS value.  
This is not pre-compiler for CSS Style Sheet, this is used to handle those in JavaScript code.

## Methods

The following methods are added to the global scope (i.e. `window`).

### `getStyleProp`

```js
property = getStyleProp(wantedProperty, elment)
```

Return a vendor-prefixed CSS property, or an original property that doesn't require vendor-prefix. If nothing was found, return an empty string.

For example:

```js
property = getStyleProp('animation', elment);
console.log(property);
// -> "webkitAnimation" on Chrome
// -> "animation" on Firefox

property = getStyleProp('columnWidth', elment);
console.log(property);
// -> "webkitColumnWidth" on Chrome
// -> "MozColumnWidth" on Firefox
```

### `setStyleValue`

```js
value = setStyleValue(elment, property, wantedValue)
```

Try to set a CSS value, and return a vendor-prefixed CSS value, or an original value that doesn't require vendor-prefix. If `wantedValue` is an Array, try it with each element until any of them succeeded. If nothing could set, return an empty string.

For example:

```js
value = setStyleValue(elment, 'listStyleType', 'arabic-indic');
console.log(value);
// -> "arabic-indic" on Chrome
// -> "-moz-arabic-indic" on Firefox

value = setStyleValue(elment, 'display', ['inline-grid', 'block']);
console.log(value);
// -> "block" on Chrome
// -> "-moz-inline-grid" on Firefox
```

## Differences from jQuery

jQuery's `css()` also can find the vendor-prefixed CSS property. But jQuery can't find the vendor-prefixed CSS **value**. And your code can't get the vendor-prefixed CSS property that found by jQuery.  
And jQuery doesn't have cache. It gives an effect of the performance.

![sample](benchmark.png)

Reported by [Benchmark.js](http://benchmarkjs.com/).  
Test Code:

```js
var elmJq = $('#elm4jquery'),
  elmCp = document.getElementById('elm4css-prefix');

// jQuery CSS property
function jqProp() {
  elmJq.css('column-width', '5px');
  elmJq.css('column-width', '10px');
}

// cssPrefix CSS property
function cpProp() {
  elmCp.style[getStyleProp('column-width', elmCp)] = '5px';
  elmCp.style[getStyleProp('column-width', elmCp)] = '10px';
}

// jQuery CSS value
function jqValue() {
  // jQuery can't find vendor-prefixed CSS value.
  elmJq.css('cursor', 'grab,-webkit-grab');
  elmJq.css('cursor', 'grabbing,-webkit-grabbing');
}

// cssPrefix CSS value
function cpValue() {
  setStyleValue(elmCp, 'cursor', 'grab');
  setStyleValue(elmCp, 'cursor', 'grabbing');
}
```
