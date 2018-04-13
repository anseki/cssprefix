describe('getName', function() {
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

  it('gets original name', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getNameDone = '';
    expect(CSSPrefix.getName('position')).toBe('position');
    expect(window.getNameDone).toBe('get');
  });

  it('should return undefined if the name is unsupported', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getNameDone = '';
    expect(typeof CSSPrefix.getName('foo')).toBe('undefined');
    expect(window.getNameDone).toBe('get');
  });

  it('should return undefined if empty string is specified', function() {
    var CSSPrefix = window.CSSPrefix;
    window.setDeclaration(); // Reset

    window.getNameDone = '';
    expect(typeof CSSPrefix.getName('')).toBe('undefined');
    expect(window.getNameDone).toBe('');
  });

  top.NAME_DATA.forEach(function(testCase) {
    var propName = testCase.propName;
    testCase.envs.forEach(function(env) {

      it('gets prefixed name - `' + propName + '` -> `' + env.actualName +
          '` in ' + env.envClass, function() {
        var CSSPrefix = window.CSSPrefix;
        window.clearCache();
        // Setup Stub for CSSStyleDeclaration
        window.setupStub(env.actualName);

        window.getNameDone = '';
        expect(CSSPrefix.getName(propName)).toBe(env.actualName);
        expect(window.getNameDone).toBe('get');

        // Again
        window.getNameDone = '';
        expect(CSSPrefix.getName(propName)).toBe(env.actualName);
        expect(window.getNameDone).toBe('');
      });
    });
  });

  top.NAME_DATA.forEach(function(testCase) {
    var propName = testCase.propName;
    testCase.envs.forEach(function(env) {

      it('gets prefixed name from cache - `' + propName + '` -> `' + env.actualName +
          '` in ' + env.envClass, function() {
        var CSSPrefix = window.CSSPrefix;
        window.clearCache();

        window.setDeclaration(); // Reset

        window.getNameDone = '';
        expect(CSSPrefix.getName('position')).toBe('position');
        expect(window.getNameDone).toBe('get');

        // Setup Stub for CSSStyleDeclaration
        window.setupStub(env.actualName);

        window.getNameDone = '';
        expect(CSSPrefix.getName(propName)).toBe(env.actualName);
        expect(window.getNameDone).toBe('get');

        window.getNameDone = '';
        expect(CSSPrefix.getName(propName)).toBe(env.actualName); // #2
        expect(window.getNameDone).toBe('');

        window.setDeclaration(); // Reset

        window.getNameDone = '';
        expect(typeof CSSPrefix.getName('foo')).toBe('undefined');
        expect(window.getNameDone).toBe('get');

        window.getNameDone = '';
        expect(CSSPrefix.getName('position')).toBe('position'); // #2
        expect(window.getNameDone).toBe('');

        window.getNameDone = '';
        expect(typeof CSSPrefix.getName('foo')).toBe('undefined'); // #2
        expect(window.getNameDone).toBe('');
      });
    });
  });

});
