'use strict';

import convertCss from './converters/css.converter';
import convertHtml from './converters/html.converter';
import Classes from './classes/classes.class';

module.exports = class Uglicssy {
  static bundle() {
    return new this;
  }

  constructor() {
    this.classes = new Classes();
  }

  convert(contents, type) {
    if (type === 'css') {
      return convertCss(contents, this.classes);
    }

    if (type === 'html') {
      return convertHtml(contents, this.classes);
    }
  }
};