'use strict';

const js = require('recast');
const uglifyJs = require('uglify-js');
const minify = require('../minify');

function jsProcessor(contents, classes, converters) {
  const jsAst = js.parse(contents);

  jsAst.program.body = converters.reduce((convertedNode, converter) => {
    return converter(convertedNode, classes, minify);
  }, jsAst.program.body);

  const minified = uglifyJs.minify(js.print(jsAst).code, {fromString: true});

  return minified.code;
}

module.exports = jsProcessor;