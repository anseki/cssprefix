# CSSPrefix

[![npm](https://img.shields.io/npm/v/cssprefix.svg)](https://www.npmjs.com/package/cssprefix) [![GitHub issues](https://img.shields.io/github/issues/anseki/css-prefix.svg)](https://github.com/anseki/css-prefix/issues) [![dependencies](https://img.shields.io/badge/dependencies-No%20dependency-brightgreen.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE-MIT)

CSS Prefixer for JavaScript code.  
The small snipet that get or set vendor-prefixed CSS property or CSS value.  
This is not pre-compiler for CSS, this is used to handle those in JavaScript code.

## Usage

Load CSSPrefix into your web page.

```html
<script src="css-prefix.min.js"></script>
```

## Methods

### `CSSPrefix.getProp`

```js
property = CSSPrefix.getProp(wantedProperty, element)
```

Return a vendor-prefixed CSS property, or an original property that doesn't require vendor-prefix. If nothing was found, return an empty string.

For example:

```js
property = CSSPrefix.getProp('text-emphasis', element);
console.log(property);
// -> "webkitTextEmphasis" on Chrome
// -> "textEmphasis" on Firefox

property = CSSPrefix.getProp('column-count', element);
console.log(property);
// -> "columnCount" on Chrome
// -> "MozColumnCount" on Firefox
```

### `CSSPrefix.setValue`

```js
value = CSSPrefix.setValue(element, property, wantedValue)
```

Try to set a CSS value, and return a vendor-prefixed CSS value, or an original value that doesn't require vendor-prefix. If `wantedValue` is an Array that includes multiple values, try it with each value until any of them succeeded. If nothing could set, return an empty string.

For example:

```js
value = CSSPrefix.setValue(element, 'cursor', 'grab');
console.log(value);
// -> "-webkit-grab" on Chrome
// -> "grab" on Firefox

value = CSSPrefix.setValue(element, 'display', ['inline-grid', 'block']);
console.log(value);
// -> "block" on Chrome
// -> "-moz-inline-grid" on Firefox
```

## Differences from jQuery

jQuery also can find the vendor-prefixed CSS property. But jQuery can't find the vendor-prefixed CSS **value**. And your code can't get the vendor-prefixed CSS property that jQuery found.  
And jQuery doesn't have cache. That affects performance.

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

// CSSPrefix CSS property
function cpProp() {
  elmCp.style[CSSPrefix.getProp('column-width', elmCp)] = '5px';
  elmCp.style[CSSPrefix.getProp('column-width', elmCp)] = '10px';
}

// jQuery CSS value
function jqValue() {
  // jQuery can't find vendor-prefixed CSS value.
  elmJq.css('cursor', 'grab,-webkit-grab');
  elmJq.css('cursor', 'grabbing,-webkit-grabbing');
}

// CSSPrefix CSS value
function cpValue() {
  CSSPrefix.setValue(elmCp, 'cursor', 'grab');
  CSSPrefix.setValue(elmCp, 'cursor', 'grabbing');
}
```

## Old APIs

Old APIs `getStyleProp` and `setStyleValue` are still supported.
