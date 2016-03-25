'use strict';

const ClassesItem = require('../classes/classesItem.class');

function minify(selectorNames, classes) {
  const dotNotation = selectorNames.indexOf('.') !== -1;

  let dotPrefix = '';
  let found;
  let modulo;
  let newClassesItem;

  function getClassName(selectorName) {
    if (dotNotation) {
      if (selectorName.substr(0, 1) === '.') {
        dotPrefix = '.';
        return selectorName.substr(1);
      } else {
        return null;
      }
    }

    return selectorName;
  }

  function minify(selectorName) {
    const className = getClassName(selectorName);

    if (className === null) {
      return selectorName;
    }

    found = classes.list.find((item) => item.className === className);

    if (!found) {
      modulo = classes.lastIndex % 36;

      if (modulo < 10) {
        classes.lastIndex += 10 - modulo;
      }

      newClassesItem = new ClassesItem(className, classes.lastIndex);
      classes.list.push(newClassesItem);

      found = classes.list.slice(classes.list.length - 1)[0];

      classes.lastIndex++;
    }

    return dotPrefix + found.minified;
  }

  return selectorNames
    .split(' ')
    .map((selectorName) => minify(selectorName))
    .join(' ');
}

module.exports = minify;