'use strict';

import Classes from './classes/classes.class';

import defaultCssConverter from './converters/css/default.css.converter.js';
import defaultHtmlConverter from './converters/html/default.html.converter';
import defaultJsConverter from './converters/js/default.js.converter';

import cssProcessor from './helpers/processors/css.processor';
import htmlProcessor from './helpers/processors/html.processor';
import jsProcessor from './helpers/processors/js.processor';

const converters = {
  css: [defaultCssConverter],
  html: [defaultHtmlConverter],
  js: [defaultJsConverter]
};

const appRootPath = require('app-root-path');
const fs = require('fs');

let config;

try {
  const configRaw = fs.readFileSync(appRootPath + '/.uglicssyrc');
  const configString = configRaw.toString();

  if (configString) {
    config = JSON.parse(configString);
  }

  if (config && Array.isArray(config.presets)) {
    config.presets.forEach((preset) => {
      require(preset);
    });
  }
} catch (err) {
  if (err.errno === -2) {
    console.warn('Configuration file .uglicssyrc not found.');
  } else if (err.code === 'MODULE_NOT_FOUND') {
    console.error('Error during presets loading:', err);
  } else {
    console.error('Could not parse the .uglicssyrc configuration file due to the following error:', err);
  }
}

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