'use strict';

const Uglicssy = require('../src/index.js');
const fs = require('fs');

const originalCss = fs.readFileSync('spec/mock/original/basic.css', {encoding: 'utf8'});
const expectedCss = fs.readFileSync('spec/mock/expected/basic.css', {encoding: 'utf8'});
const originalHtml = fs.readFileSync('spec/mock/original/basic.html', {encoding: 'utf8'});
const expectedHtml = fs.readFileSync('spec/mock/expected/basic.html', {encoding: 'utf8'});
const originalJs = fs.readFileSync('spec/mock/original/basic.js', {encoding: 'utf8'});
const expectedJs = fs.readFileSync('spec/mock/expected/basic.js', {encoding: 'utf8'});

describe('Uglicssy', function () {
  describe('convert', function () {
    it('should convert css string', function () {
      const bundle = Uglicssy.bundle();

      expect(bundle.convert(originalCss, 'css')).toEqual(expectedCss);
    });

    it('should convert html string', function () {
      const bundle = Uglicssy.bundle();

      expect(bundle.convert(originalHtml, 'html')).toEqual(expectedHtml);
    });

    it('should convert js string', function () {
      const bundle = Uglicssy.bundle();

      expect(bundle.convert(originalJs, 'js')).toEqual(expectedJs);
    });
  });
});