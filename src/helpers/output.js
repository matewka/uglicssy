'use strict';

const Classes = require('../classes/classes.class');

const config = require('./config');
const fs = require('fs');

class Output {
  static getClasses() {
    if (config.outputFile) {
      try {
        const classesString = fs.readFileSync(config.outputFile);

        return JSON.parse(classesString);
      } catch (err) {
        if (err.errno === -2) {
          return new Classes();
        } else {
          console.error('Uglicssy: Could not parse the output file due to the following error:', err);
        }
      }
    }

    return new Classes();
  }

  static saveClasses(classes) {
    if (config.outputFile) {
      const classesString = JSON.stringify(classes, null, 4);

      try {
        const fStat = fs.statSync(config.outputFile);

        if (fStat.isFile()) {
          fs.writeFileSync(config.outputFile, '', {flag: 'w'});
        }
      } catch (err) {}

      fs.writeFileSync(config.outputFile, classesString, {flag: 'w'});
    }
  }
}

module.exports = Output;