'use strict';

import * as js from 'recast';
import ClassesItem from '../../classes/classesItem.class.js';
import minify from '../minify';

export default (contents, classes, converters) => {
  const jsAst = js.parse(contents);

  jsAst.program.body = converters.reduce((convertedNode, converter) => {
    return converter(convertedNode, classes, minify);
  }, jsAst.program.body);

  return js.print(jsAst).code;
}