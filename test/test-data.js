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

// Test Data for Property Name
window.NAME_DATA = [
  {
    propName: 'display',
    envs: [
      {envClass: 'blink/webkit', actualName: 'webkitDisplay'},
      {envClass: 'gecko', actualName: 'MozDisplay'},
      {envClass: 'edge/trident', actualName: 'msDisplay'},
      {envClass: 'opera', actualName: 'oDisplay'},
      {envClass: 'SUPPORT', actualName: 'display'} // Env that supports it
    ]
  },
  {
    propName: 'border-fit',
    envs: [
      {envClass: 'blink/webkit', actualName: 'webkitBorderFit'},
      {envClass: 'gecko', actualName: 'MozBorderFit'},
      {envClass: 'edge/trident', actualName: 'msBorderFit'},
      {envClass: 'opera', actualName: 'oBorderFit'},
      {envClass: 'SUPPORT', actualName: 'borderFit'} // Env that supports it
    ]
  },
  {
    propName: 'borderFit',
    envs: [
      {envClass: 'blink/webkit', actualName: 'webkitBorderFit'},
      {envClass: 'gecko', actualName: 'MozBorderFit'},
      {envClass: 'edge/trident', actualName: 'msBorderFit'},
      {envClass: 'opera', actualName: 'oBorderFit'},
      {envClass: 'SUPPORT', actualName: 'borderFit'} // Env that supports it
    ]
  }
];

// Test Data for Property Value
window.NAME_VALUE = [
  {
    propName: 'cursor', propValue: 'grab',
    envs: [
      {envClass: 'blink/webkit', actualValue: '-webkit-grab'},
      {envClass: 'gecko', actualValue: '-moz-grab'},
      {envClass: 'edge/trident', actualValue: '-ms-grab'},
      {envClass: 'opera', actualValue: '-o-grab'},
      {envClass: 'SUPPORT', actualValue: 'grab'} // Env that supports it
    ]
  },
  {
    propName: 'display', propValue: 'inline-grid',
    envs: [
      {envClass: 'blink/webkit', actualValue: '-webkit-inline-grid'},
      {envClass: 'gecko', actualValue: '-moz-inline-grid'},
      {envClass: 'edge/trident', actualValue: '-ms-inline-grid'},
      {envClass: 'opera', actualValue: '-o-inline-grid'},
      {envClass: 'SUPPORT', actualValue: 'inline-grid'} // Env that supports it
    ]
  }
];
