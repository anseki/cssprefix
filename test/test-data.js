/* eslint-env browser */

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
window.VALUE_DATA = [
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
