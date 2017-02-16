
describe('getValue', function() {
  'use strict';

  var window, pageDone, prefixed;

  beforeAll(function(beforeDone) {
    loadPage('spec/common.html', function(pageWindow, pageDocument, pageBody, done) {
      window = pageWindow;
      pageDone = done;

      prefixed =
        window.IS_TRIDENT ? ['display', 'inline-grid', '-ms-inline-grid'] :
        window.IS_EDGE ? ['display', 'inline-grid', '-ms-inline-grid'] :
        window.IS_WEBKIT ? ['cursor', 'grab', '-webkit-grab'] : // But it has bug
        window.IS_BLINK ? ['cursor', 'grab', '-webkit-grab'] :
        ['display', 'inline-grid', '-moz-inline-grid']; // IS_GECKO

      beforeDone();
    },'1');
  });

  afterAll(function() {
    pageDone();
  });

  it('gets prefixed value', function() {
    var CSSPrefix = window.CSSPrefix;

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['dummy1', 'absolute', 'dummy2'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['dummy1', 'get', 'absolute', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue(prefixed[0], ['dummy1', prefixed[1], 'dummy2'])).toBe(prefixed[2]);
    expect(window.getValueDone).toEqual(['dummy1', 'get', prefixed[1], 'get']);

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('foo', ['dummy1', 'absolute', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual([]); // `foo` is denied

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['dummy1', 'foo', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['dummy1', 'foo', 'get', 'dummy2', 'get']); // dummy1 is cached

    // Empty string
    window.getValueDone = [];
    expect(CSSPrefix.getValue('animation-name', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('left', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['', 'get']);
  });

  it('gets prefixed value from cache', function() {
    var CSSPrefix = window.CSSPrefix;

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['dummy1', 'absolute', 'dummy2'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['dummy1', 'absolute']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue(prefixed[0], ['dummy1', prefixed[1], 'dummy2'])).toBe(prefixed[2]);
    expect(window.getValueDone).toEqual(['dummy1', prefixed[1]]);

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('foo', ['dummy1', 'absolute', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual([]); // `foo` is denied

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['dummy1', 'foo', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['dummy1', 'foo', 'dummy2']);

    // Empty string
    window.getValueDone = [];
    expect(CSSPrefix.getValue('animation-name', ['dummy1', '', 'dummy2'])).toBe('dummy1');
    expect(window.getValueDone).toEqual(['dummy1', 'get']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('left', ['dummy1', '', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['dummy1', 'get', '']);
  });

  it('gets prefixed value from cache first', function() {
    var CSSPrefix = window.CSSPrefix;

    window.getValueDone = [];
    expect(CSSPrefix.getValue('position', ['absolute', 'dummy1', 'dummy2'])).toBe('absolute');
    expect(window.getValueDone).toEqual(['absolute']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue(prefixed[0], [prefixed[1], 'dummy1', 'dummy2'])).toBe(prefixed[2]);
    expect(window.getValueDone).toEqual([prefixed[1]]);

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('foo', ['absolute', 'dummy1', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual([]); // `foo` is denied

    window.getValueDone = [];
    expect(typeof CSSPrefix.getValue('position', ['foo', 'dummy1', 'dummy2'])).toBe('undefined');
    expect(window.getValueDone).toEqual(['foo', 'dummy1', 'dummy2']);

    // Empty string
    window.getValueDone = [];
    expect(CSSPrefix.getValue('animation-name', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['']);

    window.getValueDone = [];
    expect(CSSPrefix.getValue('left', ['', 'dummy1', 'dummy2'])).toBe('');
    expect(window.getValueDone).toEqual(['']);
  });

});
