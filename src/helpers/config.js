'use strict';

const appRootPath = require('app-root-path');
const fs = require('fs');

let config = {};

try {
  const configRaw = fs.readFileSync(appRootPath + '/.uglicssyrc');
  const configString = configRaw.toString();
  let configRc;

  if (configString) {
    configRc = JSON.parse(configString);
  }

  if (configRc && Array.isArray(configRc.presets)) {
    config.presetsConf = configRc.presets.reduce((conf, preset) => {
      conf.push(require(preset));
    }, []);
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

export default config;