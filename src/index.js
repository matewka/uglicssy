'use strict';

const Output = require('./helpers/output');

const cssProcessor = require('./helpers/processors/css.processor');
const htmlProcessor = require('./helpers/processors/html.processor');
const jsProcessor = require('./helpers/processors/js.processor');

const config = require('./helpers/config');

class Uglicssy {
  constructor() {
    this.classes = Output.getClasses();
  }

  static bundle() {
    return new this;
  }

  convert(contents, type) {
    let converted;

    if (type === 'css') {
      converted = cssProcessor(contents, this.classes, config.converters.css);
    } else if (type === 'html') {
      converted = htmlProcessor(contents, this.classes, config.converters.html);
    } else if (type === 'js') {
      converted = jsProcessor(contents, this.classes, config.converters.js);
    }

    Output.saveClasses(this.classes);

    return converted;
  }
}

module.exports = Uglicssy;