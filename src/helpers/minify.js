'use strict';

import ClassesItem from '../classes/classesItem.class';

export default (className, classes) => {
  let found = classes.list.find((item) => item.className === className);
  let modulo;
  let newClassesItem;

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

  return found.minified;
};