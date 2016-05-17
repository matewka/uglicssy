'use strict';

const Output = require('./helpers/output');

const cssProcessor = require('./helpers/processors/css.processor');
const htmlProcessor = require('./helpers/processors/html.processor');
const jsProcessor = require('./helpers/processors/js.processor');

const Config = require('./helpers/config');

class Uglicssy {
  constructor(options) {
    this.output = new Output();
    this.classes = this.output.getClasses();
    this.config = new Config(options);
  }

  static bundle() {
    return new this;
  }

  convert(contents, type, save) {
    let converted;

    if (type === 'css') {
      converted = cssProcessor(contents, this.classes);
    } else if (type === 'html') {
      converted = htmlProcessor(contents, this.classes);
    } else if (type === 'js') {
      converted = jsProcessor(contents, this.classes);
    }

    if (save === true || save === undefined) {
      this.save();
    }

    return converted;
  }

  save() {
    this.output.saveClasses(this.classes);
  }
}

module.exports = Uglicssy;