const Uglicssy = require('../dist/index.js');
const fs = require('fs');

const originalCss = fs.readFileSync('spec/mock/expect/basic.css', {encoding: 'utf8'});
const expectedCss = fs.readFileSync('spec/mock/equal/basic.css', {encoding: 'utf8'});

describe('Uglicssy', function () {
  describe('convert', function () {
    it('should convert css string', function () {
      const classes = Uglicssy.init();

      expect(Uglicssy.convert(originalCss, classes, 'css')).toEqual(expectedCss);
    });
  });
});