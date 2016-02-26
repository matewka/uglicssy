'use strict';

import minify from '../../helpers/minify';

export default function defaultHtmlConverter(node, classes) {
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

  return node;
}