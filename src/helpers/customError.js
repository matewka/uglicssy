'use strict';

const util = require('util');

class CustomError extends Error {
  constructor(message, code) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

module.exports = CustomError;