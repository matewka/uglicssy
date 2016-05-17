'use strict';

const cssClassRegex = /\.[a-zA-Z0-9_-]+/g;

function defaultCssConverter(selector, classes, minifyFn, verbose) {
  if (selector.indexOf('.') !== -1) {
    const converted = selector.replace(cssClassRegex, (className) => {
      return minifyFn(className, classes);
    });

    verbose.printConverted(selector, converted, defaultCssConverter);

    return converted;
  }

  return selector;
}

module.exports = defaultCssConverter;