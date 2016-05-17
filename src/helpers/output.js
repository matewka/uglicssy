'use strict';

const Classes = require('../classes/classes.class');

const colors = require('colors/safe');
const Config = require('./config');
const fs = require('fs');

class Output {
  constructor() {
    this.config = new Config();
  }

  getClasses() {
    if (this.config.outputFile) {
      try {
        const classesString = fs.readFileSync(this.config.outputFile);

        return JSON.parse(classesString);
      } catch (err) {
        if (err.errno === -2) {
          return new Classes();
        } else {
          console.error(`${colors.red('Uglicssy')} -> Could not parse the output file due to the following error: ${colors.italic(err)}`);
        }
      }
    }

    return new Classes();
  }

  saveClasses(classes) {
    if (this.config.rc.outputFile) {
      const classesString = JSON.stringify(classes, null, 2);

      try {
        const fStat = fs.statSync(this.config.rc.outputFile);

        if (fStat.isFile()) {
          fs.writeFileSync(this.config.rc.outputFile, '', {flag: 'w'});
        }
      } catch (err) {}

      fs.writeFileSync(this.config.rc.outputFile, classesString, {flag: 'w'});
    }
  }
}

module.exports = Output;