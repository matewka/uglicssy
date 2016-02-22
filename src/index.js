const Uglicssy = (function () {
  'use strict';

  const css = require('css');
  const fs = require('fs');
  const glob = require('glob');
  const regex = {
    css: /\.(-?[a-zA-Z0-9_-]+)(?=[, ]\{?)/,
    cssClass: /[a-zA-Z0-9_-]/
  };

  const Uglicssy = {
    convert,
    convertFile,
    fromGlob,
    init
  };

  function convert(contents, classes, type) {
    if (type === 'css') {
      return convertCss(contents, classes);
    }

    return convertHtml(contents, classes);
  }

  function convertCss(contents, classes) {
    const cssAst = css.parse(contents);

    function minifyClassName(selector) {
      let found;
      let mod;

      return selector.replace(/^[a-zA-Z0-9_-]+/, (match) => {
        found = classes.list.find((item) => item.className === match);

        if (!found) {
          mod = classes.lastIndex % 36;

          if (mod < 10) {
            classes.lastIndex += 10 - mod;
          }

          classes.list.push({
            className: match,
            minified: classes.lastIndex.toString(36).split('').reverse().join('')
          });

          found = classes.list.slice(classes.list.length - 1)[0];
        }

        classes.lastIndex++;

        return found.minified;
      });
    }

    function processRule(rule) {
      rule.selectors = rule.selectors.map((selector) => {
        if (selector.indexOf('.') === 0) {
          return '.' + minifyClassName(selector.substr(1));
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
  }

  function convertHtml(contents, classes) {

  }

  function convertFile(globFile, classes) {

  }

  function fromGlob(globSearch) {
    //glob.sync(globSearch, {
    //  nosort: true
    //}, (er, fileNames) => {
    //  return convertFile(fileNames);
    //});
  }

  function init() {
    return {
      lastIndex: 0,
      list: []
    };
  }

  return Uglicssy
}());

module.exports = Uglicssy;