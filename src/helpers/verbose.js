'use strict';

const colors = require('colors/safe');
const NonVerbose = require('./nonVerbose');

class Verbose {
  static getInstance(isVerbose) {
    if (isVerbose) {
      return new Verbose(this);
    }
    
    return new NonVerbose();
  }
  
  printConverted(beforeClass, afterClass, converter) {
    console.log(`${colors.green('Uglicssy')} -> ${colors.yellow.italic(converter.name)} -> converted ${colors.blue(beforeClass)} to ${colors.blue(afterClass)}`);
  }
}

module.exports = Verbose;