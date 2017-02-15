/* eslint-env browser */

window.IS_TRIDENT = !!document.uniqueID;
window.IS_EDGE = '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style && !window.navigator.msPointerEnabled;
window.IS_WEBKIT = !window.chrome && 'WebkitAppearance' in document.documentElement.style;
window.IS_BLINK = !!(window.chrome && window.chrome.webstore);
window.IS_GECKO = 'MozAppearance' in document.documentElement.style;

window.PREFIX =
  window.IS_TRIDENT ? '-ms-' :
  window.IS_EDGE ? '-ms-' :
  window.IS_WEBKIT ? '-webkit-' :
  window.IS_BLINK ? '-webkit-' :
  '-moz-'; // IS_GECKO
