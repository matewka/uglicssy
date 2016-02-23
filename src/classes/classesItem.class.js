'use strict';

export default class ClassesItem {
  constructor(className, index) {
    this.className = className;
    this.minified = index.toString(36).split('').reverse().join('');
  }
}