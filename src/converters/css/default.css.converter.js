'use strict';

const cssClassRegex = /\.[a-zA-Z0-9_-]+/g;

export default function defaultCssConverter(selector, classes, minifyFn) {
  if (selector.indexOf('.') !== -1) {
    return selector.replace(cssClassRegex, (className) => {
      return minifyFn(className, classes);
    });
  }

  return selector;
}