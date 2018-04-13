describe('getValue', function() {
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

  it('gets original value', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['dummy1', 'absolute', 'dummy2'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['dummy1', 'get', 'absolute', 'get']);

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['dummy1', 'foo', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['dummy1', 'foo', 'get', 'dummy2', 'get']); // dummy1 is cached
  });

  it('should return undefined if the name is unsupported', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('foo', ['dummy1', 'absolute', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual([]); // `foo` is denied
  });

  it('should return undefined if the value is not accepted', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['dummy1', 'dummy3'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['dummy1', 'dummy3', 'get']); // dummy1 is cached
  });

  it('accepts empty string as value', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getValueDone = [];
    expect(CSSPrefix.getValue('animation-name', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('left', ['dummy1', '', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['dummy1', 'get', '', 'get']);
  });

  it('gets prefixed value from cache first', function() {
    var CSSPrefix = window.CSSPrefix;
    window.clearCache();
    window.setDeclaration(); // Reset

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['absolute'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['absolute', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['absolute', 'dummy1', 'dummy2'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['absolute']);

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('foo', ['absolute', 'dummy1', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual([]); // `foo` is denied

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['foo', 'dummy1', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['foo', 'get', 'dummy1', 'get', 'dummy2', 'get']);

    // Empty string
    window.getValueDone = [];
    expect(CSSPrefix.getValue('animation-name', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('left', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['', 'get']);
  });

  top.VALUE_DATA.forEach(function(testCase) {
    var propName = testCase.propName,
      propValue = testCase.propValue;
    testCase.envs.forEach(function(env) {

      it('gets prefixed value - `' + propName + ': ' + propValue +
          '` -> `' + propName + ': ' + env.actualValue + '` in ' + env.envClass, function() {
        var CSSPrefix = window.CSSPrefix;
        window.clearCache();
        // Setup Stub for CSSStyleDeclaration
        window.setupStub(propName, env.actualValue);

        window.getValueDone = [];
        expect(CSSPrefix.getValue(propName, ['dummy1', propValue, 'dummy2'])).toBe(env.actualValue);
        expect(window.getValueDone).toEqual(['dummy1', 'get', propValue, 'get']);

        // Again (env.actualValue instead of propValue)
        window.getValueDone = [];
        expect(CSSPrefix.getValue(propName, ['dummy1', env.actualValue, 'dummy2'])).toBe(env.actualValue);
        expect(window.getValueDone).toEqual(['dummy1', propValue]);
      });
    });
  });

  top.VALUE_DATA.forEach(function(testCase) {
    var propName = testCase.propName,
      propValue = testCase.propValue;
    testCase.envs.forEach(function(env) {

      it('gets prefixed value from cache - `' + propName + ': ' + propValue +
          '` -> `' + propName + ': ' + env.actualValue + '` in ' + env.envClass, function() {
        var CSSPrefix = window.CSSPrefix;
        window.clearCache();

        window.setDeclaration(); // Reset

        window.getValueDone = [];
        expect(CSSPrefix.getValue('position', ['dummy1', 'absolute', 'dummy2'])).toBe('absolute');
        expect(window.getValueDone).toEqual(['dummy1', 'get', 'absolute', 'get']);

        // Setup Stub for CSSStyleDeclaration
        window.setupStub(propName, env.actualValue);

        window.getValueDone = [];
        expect(CSSPrefix.getValue(propName, ['dummy1', propValue, 'dummy2'])).toBe(env.actualValue);
        expect(window.getValueDone).toEqual(['dummy1', 'get', propValue, 'get']);

        window.getValueDone = [];
        expect(CSSPrefix.getValue(propName, ['dummy1', propValue, 'dummy2'])).toBe(env.actualValue); // #2
        expect(window.getValueDone).toEqual(['dummy1', propValue]);

        window.setDeclaration(); // Reset

        window.getValueDone = [];
        expect(typeof CSSPrefix.getValue('foo', ['dummy1', 'absolute', 'dummy2'])).toBe('undefined');
        expect(window.getValueDone).toEqual([]); // `foo` is denied

        window.getValueDone = [];
        expect(CSSPrefix.getValue('position', ['dummy1', 'absolute', 'dummy2'])).toBe('absolute'); // #2
        expect(window.getValueDone).toEqual(['dummy1', 'absolute']);

        // Empty string
        window.getValueDone = [];
        expect(CSSPrefix.getValue('left', ['dummy1', '', 'dummy2'])).toBe('');
        expect(window.getValueDone).toEqual(['dummy1', 'get', '', 'get']);

        window.getValueDone = [];
        expect(CSSPrefix.getValue('left', ['dummy1', '', 'dummy2'])).toBe(''); // #2
        expect(window.getValueDone).toEqual(['dummy1', '']);
      });
    });
  });

});
