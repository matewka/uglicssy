'use strict';

/*
 htmlparser2 is much faster than parse5
 but needs more investigation on how to
 perform stringify operation
*/
import * as html from 'parse5';
import ClassesItem from '../classes/classesItem.class';
import minify from '../helpers/minify';

export default (contents, classes) => {
  const htmlAst = html.parse(contents);

  function processNode(node) {
    if (node.attrs && node.attrs.length) {
      node.attrs = node.attrs.map((attr) => {
        if (attr.name === 'class') {
          attr.value = attr.value.split(' ').map((className) => {
            return minify(className, classes);
          }).join(' ');
        }

        return attr;
      });
    }

    if (node.childNodes && node.childNodes.length) {
      node.childNodes = node.childNodes.map((childNode) => processNode(childNode));
    }

    return node;
  }

  return html.serialize(processNode(htmlAst));
}