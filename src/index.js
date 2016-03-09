'use strict';

import Classes from './classes/classes.class';

import defaultCssConverter from './converters/css/default.css.converter.js';
import defaultHtmlConverter from './converters/html/default.html.converter';
import defaultJsConverter from './converters/js/default.js.converter';

import cssProcessor from './helpers/processors/css.processor';
import htmlProcessor from './helpers/processors/html.processor';
import jsProcessor from './helpers/processors/js.processor';

import config from './helpers/config';

const converters = (() => {

  const conv = {
    css: [defaultCssConverter],
    html: [defaultHtmlConverter],
    js: [defaultJsConverter]
  };

  if (config && config.presetsConf) {
    config.presetsConf.forEach((conf) => {
      conv[conf.type].push(conf.converter);
    });
  }

  return conv;
})();

module.exports = class Uglicssy {
  constructor() {
    this.classes = new Classes();
  }

  static addConverter(converter, type) {
    converters[type].push(converter);
  }

  static bundle() {
    return new this;
  }

  convert(contents, type) {
    if (type === 'css') {
      return cssProcessor(contents, this.classes, converters.css);
    }

    if (type === 'html') {
      return htmlProcessor(contents, this.classes, converters.html);
    }

    if (type === 'js') {
      return jsProcessor(contents, this.classes, converters.js);
    }
  }
};