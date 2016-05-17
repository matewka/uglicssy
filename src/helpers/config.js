'use strict';

const colors = require('colors/safe');

const CustomError = require('./customError');
const defaultCssConverter = require('../converters/css/default.css.converter.js');
const defaultHtmlConverter = require('../converters/html/default.html.converter');
const defaultJsConverter = require('../converters/js/default.js.converter');

const appRootPath = require('app-root-path');
const fs = require('fs');

let rc = null;

class Config {
  constructor(options) {
    if (rc !== null && !options) {
      this.rc = rc;
      return;
    }

    try {
      const configRaw = fs.readFileSync(appRootPath + '/.uglicssyrc');
      const configString = configRaw.toString();
      const presets = {
        css: [defaultCssConverter],
        html: [defaultHtmlConverter],
        js: [defaultJsConverter]
      };

      let configRc;

      if (configString) {
        configRc = JSON.parse(configString);
      }

      this.rc = configRc || {};

      if (configRc && configRc.presets) {
        if (!Array.isArray(configRc.presets)) {
          configRc.presets = [configRc.presets];
        }

        configRc.presets.forEach((presetName) => {
          if (!presetName) {
            return;
          }

          let preset;

          function addConverters(type) {
            if (Array.isArray(preset.converters[type])) {
              preset.converters[type].forEach((converter) => presets[type].push(converter));
            } else if (typeof preset.converters[type] === 'function') {
              presets[type].push(preset.converters[type]);
            }
          }

          try {
            preset = require(presetName);

            if (preset && preset.converters) {
              addConverters('css');
              addConverters('html');
              addConverters('js');
            } else {
              console.error(`${colors.red('Uglicssy')} -> preset ${presetName} doesn't have the 'converters' property.`);
            }
          } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') {
              console.error(`${colors.red('Uglicssy')} -> Preset ${colors.yellow(presetName)} was not found. Make sure you've installed it with ${colors.yellow.italic(`npm i ${presetName}`)}`);
            }

            throw new CustomError('Early break', 567);
          }
        });
      }

      this.rc.presets = presets;

      if (options && options.verbose) {
        this.rc.verbose = options.verbose;
      }
    } catch (err) {
      if (err.code === 567) {
        process.exit(1);
      } else if (err.errno !== -2) {
        throw err;
      }
    }

    rc = this.rc;
  }
}

module.exports = Config;