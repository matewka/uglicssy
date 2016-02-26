'use strict';

import minify from '../../helpers/minify';

const cssClassRegex = /^[a-zA-Z0-9_-]+/;

export default function defaultCssConverter(selector, classes) {
  if (selector.indexOf('.') === 0) {
    return '.' + selector.substr(1).replace(cssClassRegex, (className) => {
      return minify(className, classes);
    });
  }

  return selector;
}