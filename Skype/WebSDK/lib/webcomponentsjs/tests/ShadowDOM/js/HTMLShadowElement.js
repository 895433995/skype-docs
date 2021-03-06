/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

suite('HTMLShadowElement', function() {

  var unwrap = ShadowDOMPolyfill.unwrap;

  test('instanceof HTMLShadowElement', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a>a</a><b>b</b>';
    var a = host.firstChild;
    var b = host.lastChild;

    var sr = host.createShadowRoot();
    sr.innerHTML = 'a<shadow>b</shadow>c';
    var shadow = sr.firstElementChild;

    host.offsetWidth;
    assert.isTrue(shadow instanceof HTMLShadowElement);

    var sr2 = host.createShadowRoot();
    sr2.innerHTML = 'd<shadow>e</shadow>f';
    var shadow2 = sr2.firstElementChild;

    host.offsetWidth;
    assert.isTrue(shadow instanceof HTMLShadowElement);

    assert.isTrue(shadow2 instanceof HTMLShadowElement);

    assert.equal(unwrap(host).innerHTML, 'da<a>a</a><b>b</b>cf');
  });

  test('constructor', function() {
    assert.equal(HTMLShadowElement,
                 document.createElement('shadow').constructor);
  });

  test('adding a new shadow element to a shadow tree', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var sr = host.createShadowRoot();
    sr.innerHTML = '<content></content>';

    var sr2 = host.createShadowRoot();
    sr2.innerHTML = '<b></b>';
    var b = sr2.firstChild;

    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b></b>');

    var shadow = document.createElement('shadow');
    b.appendChild(shadow);

    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b><a></a></b>');

    b.removeChild(shadow);
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b></b>');
  });

  test('Mutating shadow fallback (fallback support has been removed)', function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var sr = host.createShadowRoot();
    sr.innerHTML = '<shadow></shadow>';
    var shadow = sr.firstChild;

    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<a></a>');

    shadow.textContent = 'fallback';
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<a></a>');

    var b = shadow.appendChild(document.createElement('b'));
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<a></a>');

    shadow.removeChild(b);
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<a></a>');
  });

  test('Mutating shadow fallback 2 (fallback support has been removed)',
      function() {
    var host = document.createElement('div');
    host.innerHTML = '<a></a>';
    var a = host.firstChild;

    var sr = host.createShadowRoot();
    sr.innerHTML = '<b><shadow></shadow></b>';
    var b = sr.firstChild;
    var shadow = b.firstChild;

    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b><a></a></b>');

    shadow.textContent = 'fallback';
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b><a></a></b>');

    var c = shadow.appendChild(document.createElement('c'));
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b><a></a></b>');

    shadow.removeChild(c);
    host.offsetHeight;
    assert.equal(unwrap(host).innerHTML, '<b><a></a></b>');
  });
});
