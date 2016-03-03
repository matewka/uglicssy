'use strict';

/*
 htmlparser2 is much faster than parse5
 but needs more investigation on how to
 perform stringify operation
*/
import * as html from 'parse5';
import minify from '../minify';

export default function defaultHtmlConverter(contents, classes, converters) {
  const htmlAst = html.parse(contents);

  function processNode(node) {
    node = converters.reduce((convertedNode, converter) => {
      return converter(convertedNode, classes, minify);
    }, node);

    if (node.childNodes && node.childNodes.length) {
      node.childNodes = node.childNodes.map((childNode) => processNode(childNode));
    }

    return node;
  }

  return html.serialize(processNode(htmlAst));
}