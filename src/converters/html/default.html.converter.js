'use strict';

function defaultHtmlConverter(node, classes, minifyFn, verbose) {
  if (node.attrs && node.attrs.length) {
    node.attrs = node.attrs.map((attr) => {
      if (attr.name === 'class') {
        const value = attr.value.split(' ').map((className) => {
          return minifyFn(className, classes);
        }).join(' ');

        verbose.printConverted(attr.value, value, defaultHtmlConverter);
        attr.value = value;
      }

      return attr;
    });
  }

  return node;
}

module.exports = defaultHtmlConverter;