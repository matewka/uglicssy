'use strict';

class ClassesItem {
  constructor(className, index) {
    this.className = className;
    this.minified = index.toString(36).split('').reverse().join('');
  }
}

module.exports = ClassesItem;