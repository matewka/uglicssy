'use strict';

import ClassesItem from '../classes/classesItem.class';

export default (className, classes) => {
  let dotPrefix = '';
  let found;
  let modulo;
  let newClassesItem;

  if (className.substr(0, 1) === '.') {
    dotPrefix = '.';
    className = className.substr(1);
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
  }

  classes.lastIndex++;

  return dotPrefix + found.minified;
};