'use strict';

const js = require('recast');
const uglifyJs = require('uglify-js');
const minify = require('../minify');

const Config = require('../config');
const Verbose = require('../verbose');

function jsProcessor(contents, classes) {
  const jsAst = js.parse(contents);
  const config = new Config();
  const verbose = Verbose.getInstance(config.rc.verbose);

  jsAst.program.body = config.rc.presets.js.reduce((convertedNode, converter) => {
    return converter(convertedNode, classes, minify, verbose);
  }, jsAst.program.body);

  const minified = uglifyJs.minify(js.print(jsAst).code, {fromString: true});

  return minified.code;
}

module.exports = jsProcessor;