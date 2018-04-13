describe('functions', function() {
  'use strict';

  var window, pageDone;

  beforeAll(function(beforeDone) {
    loadPage('spec/common.html', function(pageWindow, pageDocument, pageBody, done) {
      window = pageWindow;
      pageDone = done;

      beforeDone();
    });
  });

  afterAll(function() {
    pageDone();
  });

  it('normalizeName', function() {
    var normalizeName = window.normalizeName;

    // camelCase
    expect(normalizeName(' foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' foo - bar-baz-123-abc-xyz  ')).toBe('fooBarBaz123AbcXyz');

    // Remove prefix
    expect(normalizeName(' -webkit-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' -ms-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' -moz-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' -o-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' webkit-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' ms-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' moz-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' o-foo - bar  ')).toBe('fooBar');
    expect(normalizeName(' webkitFooBar ')).toBe('fooBar');
    expect(normalizeName(' msFooBar ')).toBe('fooBar');
    expect(normalizeName(' mozFooBar ')).toBe('fooBar');
    expect(normalizeName(' oFooBar ')).toBe('fooBar');
    expect(normalizeName(' MsFooBar ')).toBe('fooBar'); // Ms

    // Don't change
    expect(normalizeName('fooBar')).toBe('fooBar');
    expect(normalizeName('webkitfooBar')).toBe('webkitfooBar');
    expect(normalizeName('msfooBar')).toBe('msfooBar');
    expect(normalizeName('mozfooBar')).toBe('mozfooBar');
    expect(normalizeName('ofooBar')).toBe('ofooBar');
    expect(normalizeName('MsfooBar')).toBe('MsfooBar'); // Ms

    // Don't remove that
    expect(normalizeName(' foo-webkit-bar  ')).toBe('fooWebkitBar');
    expect(normalizeName(' foo-ms-bar  ')).toBe('fooMsBar');
    expect(normalizeName(' foo-moz-bar  ')).toBe('fooMozBar');
    expect(normalizeName(' foo-o-bar  ')).toBe('fooOBar');
    expect(normalizeName(' FooWebkitBar ')).toBe('FooWebkitBar');
    expect(normalizeName(' FooMsBar ')).toBe('FooMsBar');
    expect(normalizeName(' FooMozBar ')).toBe('FooMozBar');
    expect(normalizeName(' FooOBar ')).toBe('FooOBar');
    expect(normalizeName(' FooMsBar ')).toBe('FooMsBar'); // Ms

    // old CSSOM
    expect(normalizeName('webkit-float')).toBe('cssFloat');
    expect(normalizeName('ms-float')).toBe('cssFloat');
    expect(normalizeName('moz-float')).toBe('cssFloat');
    expect(normalizeName('o-float')).toBe('cssFloat');
    expect(normalizeName('webkitFloat')).toBe('cssFloat');
    expect(normalizeName('msFloat')).toBe('cssFloat');
    expect(normalizeName('mozFloat')).toBe('cssFloat');
    expect(normalizeName('oFloat')).toBe('cssFloat');
    expect(normalizeName('MsFloat')).toBe('cssFloat'); // Ms

  });

  it('normalizeValue', function() {
    var normalizeValue = window.normalizeValue;

    // Remove prefix
    expect(normalizeValue(' - webkit-foo - bar  ')).toBe('foo-bar');
    expect(normalizeValue(' - ms-foo - bar  ')).toBe('foo-bar');
    expect(normalizeValue(' - moz-foo - bar  ')).toBe('foo-bar');
    expect(normalizeValue(' - o-foo - bar  ')).toBe('foo-bar');

    // Don't remove that
    expect(normalizeValue(' foo-webkit-bar  ')).toBe('foo-webkit-bar');
    expect(normalizeValue(' foo-ms-bar  ')).toBe('foo-ms-bar');
    expect(normalizeValue(' foo-moz-bar  ')).toBe('foo-moz-bar');
    expect(normalizeValue(' foo-o-bar  ')).toBe('foo-o-bar');

    // undefined -> ''
    expect(normalizeValue()).toBe('');
  });

  describe('cssSupports', function() {
    var cssSupports;

    beforeAll(function(done) {
      cssSupports = window.cssSupports;
      done();
    });

    it('should return true if supported name and value are passed', function() {
      window.setDeclaration(); // Reset
      expect(cssSupports('position', 'absolute')).toBe(true);
    });

    it('should return false if supported name and unsupported value are passed', function() {
      window.setDeclaration(); // Reset
      expect(cssSupports('position', 'foo')).toBe(false);
    });

    it('should return true if supported name and empty string as value are passed', function() {
      window.setDeclaration(); // Reset
      expect(cssSupports('position', '')).toBe(true);
    });

    it('should return false if unsupported name is passed', function() {
      window.setDeclaration(); // Reset
      expect(cssSupports('foo', 'absolute')).toBe(false);
    });

    it('should return false if unsupported name and empty string as value are passed', function() {
      window.setDeclaration(); // Reset
      expect(cssSupports('foo', '')).toBe(false);
    });

    top.VALUE_DATA.forEach(function(testCase) {
      var propName = testCase.propName;
      testCase.envs.forEach(function(env) {

        it('prefixed value - `' + propName + ': ' + env.actualValue +
            '` in ' + env.envClass, function() {
          // Setup Stub for CSSStyleDeclaration
          window.setupStub(propName, env.actualValue);

          expect(cssSupports(propName, env.actualValue)).toBe(true);
          expect(cssSupports(propName, env.actualValue + '-INVALID')).toBe(false);
        });
      });
    });
  });

});
