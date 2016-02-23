'use strict';

const Uglicssy = require('../dist/index.js');
const fs = require('fs');

const originalCss = fs.readFileSync('spec/mock/expect/basic.css', {encoding: 'utf8'});
const expectedCss = fs.readFileSync('spec/mock/actual/basic.css', {encoding: 'utf8'});
const originalHtml = fs.readFileSync('spec/mock/expect/basic.html', {encoding: 'utf8'});
const expectedHtml = fs.readFileSync('spec/mock/actual/basic.html', {encoding: 'utf8'});

describe('Uglicssy', function () {
  describe('convert', function () {
    it('should convert css string', function () {
      const bundle = Uglicssy.bundle();

      expect(bundle.convert(originalCss, 'css')).toEqual(expectedCss);
    });

    iit('should convert html string', function () {
      const bundle = Uglicssy.bundle();

      expect(bundle.convert(originalHtml, 'html')).toEqual(expectedHtml);
    });
  });
});