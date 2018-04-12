/* eslint-env browser */
/* eslint no-var: "off", object-shorthand: "off" */

// Setup Stub for CSSStyleDeclaration
window.setupStub = function(supportedPropName, acceptedPropValue) {
  'use strict';

  var declaration = {
    setProperty: function(propName, propValue) {
      if (acceptedPropValue && propName === supportedPropName && propValue === acceptedPropValue) {
        declaration[propName] = propValue;
      }
    },
    getPropertyValue: function(propName) { return declaration[propName]; }
  };
  declaration[supportedPropName] = '';

  window.setDeclaration(declaration); // Set Stub for CSSStyleDeclaration
};
