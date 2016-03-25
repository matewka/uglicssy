'use strict';

function defaultHtmlConverter(node, classes, minifyFn) {
  if (node.attrs && node.attrs.length) {
    node.attrs = node.attrs.map((attr) => {
      if (attr.name === 'class') {
        attr.value = attr.value.split(' ').map((className) => {
          return minifyFn(className, classes);
        }).join(' ');
      }

      return attr;
    });
  }

  return node;
}

module.exports = defaultHtmlConverter;