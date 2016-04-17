'use strict';

const defaultCssConverter = require('../converters/css/default.css.converter.js');
const defaultHtmlConverter = require('../converters/html/default.html.converter');
const defaultJsConverter = require('../converters/js/default.js.converter');

let config = {};

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
      config = JSON.parse(configString);
    }
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('Error during presets loading:', err);
    } else if (err.errno !== -2) {
      console.error('Could not parse the .uglicssyrc configuration file due to the following error:', err);
    }
  }

  config.converters = populatePresets();
})();

module.exports = config;