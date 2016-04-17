'use strict';

/*
 postcss is much faster than css (rework/css)
 but returns raw selector string and needs
 more investigation on how to perform stringify operation
 */
const css = require('css');
const minify = require('../minify');

function cssProcessor(contents, classes, converters) {
  const cssAst = css.parse(contents);

  function processRule(rule) {
    rule.selectors = rule.selectors.map((selector) => {
      return converters.reduce((convertedSelector, converter) => {
        return converter(convertedSelector, classes, minify);
      }, selector);
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

  return css.stringify(cssAst, {
    indent: '',
    compress: true
  });
}

module.exports = cssProcessor;