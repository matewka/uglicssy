'use strict';

import defaultCssConverter from '../converters/css/default.css.converter.js';
import defaultHtmlConverter from '../converters/html/default.html.converter';
import defaultJsConverter from '../converters/js/default.js.converter';

const config = {};

(() => {
  const appRootPath = require('app-root-path');
  const fs = require('fs');

  let configRc;

  function isFunction(variable) {
    return typeof variable === 'function';
  }

  function populatePresets() {
    const converters = {
      css: [defaultCssConverter],
      html: [defaultHtmlConverter],
      js: [defaultJsConverter]
    };

    if (configRc && configRc.presets) {
      if (!Array.isArray(configRc.presets)) {
        configRc.presets = [configRc.presets];
      }

      configRc.presets.forEach((presetName) => {
        if (!presetName) {
          return;
        }

        let preset = require(presetName);

        function addConverters(type) {
          if (Array.isArray(preset.converters[type])) {
            preset.converters[type].forEach((converter) => converters[type].push(converter));
          } else if (isFunction(preset.converters[type])) {
            converters[type].push(preset.converters[type]);
          }
        }

        if (preset && preset.converters) {
          addConverters('css');
          addConverters('html');
          addConverters('js');
        } else {
          console.error('Uglicssy preset: ' + presetName + ' doesn\'t have the \'converters\' property.');
        }
      });
    }

    return converters;
  }

  try {
    const configRaw = fs.readFileSync(appRootPath + '/.uglicssyrc');
    const configString = configRaw.toString();

    if (configString) {
      configRc = JSON.parse(configString);
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

  config.converters = populatePresets();
})();

export default config;