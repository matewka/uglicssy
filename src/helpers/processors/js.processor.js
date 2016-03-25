'use strict';

const js = require('recast');
const minify = require('../minify');

function jsProcessor(contents, classes, converters) {
  const jsAst = js.parse(contents);

  jsAst.program.body = converters.reduce((convertedNode, converter) => {
    return converter(convertedNode, classes, minify);
  }, jsAst.program.body);

  return js.print(jsAst).code;
}

module.exports = jsProcessor;