'use strict';

import Classes from './classes/classes.class';

import cssProcessor from './helpers/processors/css.processor';
import htmlProcessor from './helpers/processors/html.processor';
import jsProcessor from './helpers/processors/js.processor';

import config from './helpers/config';

module.exports = class Uglicssy {
  constructor() {
    this.classes = new Classes();
  }

  static bundle() {
    return new this;
  }

  convert(contents, type) {
    if (type === 'css') {
      return cssProcessor(contents, this.classes, config.converters.css);
    }

    if (type === 'html') {
      return htmlProcessor(contents, this.classes, config.converters.html);
    }

    if (type === 'js') {
      return jsProcessor(contents, this.classes, config.converters.js);
    }
  }
};