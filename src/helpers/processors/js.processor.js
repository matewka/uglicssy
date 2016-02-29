'use strict';

import * as js from 'recast';
import ClassesItem from '../../classes/classesItem.class.js';

export default (contents, classes, converters) => {
  const jsAst = js.parse(contents);

  jsAst.program.body = converters.reduce((convertedNode, converter) => {
    return converter(convertedNode, classes);
  }, jsAst.program.body);

  return js.print(jsAst).code;
}