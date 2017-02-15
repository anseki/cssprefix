
describe('getName', function() {
  'use strict';

  var window, pageDone, prefixed;

  beforeAll(function(beforeDone) {
    loadPage('spec/common.html', function(pageWindow, pageDocument, pageBody, done) {
      window = pageWindow;
      pageDone = done;

      prefixed =
        window.IS_TRIDENT ? ['scroll-limit', 'scrollLimit', 'msScrollLimit'] :
        window.IS_EDGE ? ['scroll-limit', 'scrollLimit', 'msScrollLimit'] :
        window.IS_WEBKIT ? ['border-fit', 'borderFit', 'webkitBorderFit'] :
        window.IS_BLINK ? ['border-before', 'borderBefore', 'webkitBorderBefore'] :
        ['border-end', 'borderEnd', 'MozBorderEnd']; // IS_GECKO

      beforeDone();
    });
  });

  afterAll(function() {
    pageDone();
  });

  it('gets prefixed name', function() {
    var CSSPrefix = window.CSSPrefix;

    window.getNameDone = '';
    expect(CSSPrefix.getName('position')).toBe('position');
    expect(window.getNameDone).toBe('get');

    window.getNameDone = '';
    expect(CSSPrefix.getName(prefixed[0])).toBe(prefixed[2]);
    expect(window.getNameDone).toBe('get');

    window.getNameDone = '';
    expect(CSSPrefix.getName(prefixed[1])).toBe(prefixed[2]);
    expect(window.getNameDone).toBe('');

    window.getNameDone = '';
    expect(typeof CSSPrefix.getName('foo')).toBe('undefined');
    expect(window.getNameDone).toBe('get');

    window.getNameDone = '';
    expect(typeof CSSPrefix.getName('')).toBe('undefined');
    expect(window.getNameDone).toBe('');
  });

  it('gets prefixed name from cache', function() {
    var CSSPrefix = window.CSSPrefix;

    window.getNameDone = '';
    expect(CSSPrefix.getName('position')).toBe('position');
    expect(window.getNameDone).toBe('');

    window.getNameDone = '';
    expect(CSSPrefix.getName(prefixed[0])).toBe(prefixed[2]);
    expect(window.getNameDone).toBe('');

    window.getNameDone = '';
    expect(CSSPrefix.getName(prefixed[1])).toBe(prefixed[2]);
    expect(window.getNameDone).toBe('');

    window.getNameDone = '';
    expect(typeof CSSPrefix.getName('foo')).toBe('undefined');
    expect(window.getNameDone).toBe('');
  });

});
