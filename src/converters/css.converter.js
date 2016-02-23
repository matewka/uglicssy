'use strict';

/*
 postcss is much faster than css (rework/css)
 but returns raw selector string and needs
 more investigation on how to perform stringify operation
*/
import * as css from 'css';
import ClassesItem from '../classes/classesItem.class';
import minify from '../helpers/minify';

const cssClassRegex = /^[a-zA-Z0-9_-]+/;

export default (contents, classes) => {
  const cssAst = css.parse(contents);

  function processRule(rule) {
    rule.selectors = rule.selectors.map((selector) => {
      if (selector.indexOf('.') === 0) {
        return '.' + selector.substr(1).replace(cssClassRegex, (className) => {
          return minify(className, classes);
        });
      }

      return selector;
    });

    return rule;
  }

  cssAst.stylesheet.rules = cssAst.stylesheet.rules.map((rule) => {
    if (rule) {
      if (rule.type === 'media') {
        rule.rules = rule.rules.map((mediaRule) => {
          return processRule(mediaRule);
        });
      } else if (rule.type === 'rule') {
        processRule(rule);
      }
    }

    return rule;
  });

  return css.stringify(cssAst);
};