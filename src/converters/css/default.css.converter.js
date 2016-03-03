'use strict';

const cssClassRegex = /^[a-zA-Z0-9_-]+/;

export default function defaultCssConverter(selector, classes, minifyFn) {
  if (selector.indexOf('.') === 0) {
    return '.' + selector.substr(1).replace(cssClassRegex, (className) => {
      return minifyFn(className, classes);
    });
  }

  return selector;
}