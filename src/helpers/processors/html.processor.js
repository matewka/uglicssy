'use strict';

/*
 htmlparser2 is much faster than parse5
 but needs more investigation on how to
 perform stringify operation
*/
const html = require('parse5');
const htmlmin = require('htmlmin');
const minify = require('../minify');

const Config = require('../config');
const Verbose = require('../verbose');

function htmlProcessor(contents, classes) {
  const htmlAst = html.parse(contents);
  const config = new Config();
  const verbose = Verbose.getInstance(config.rc.verbose);

  function processNode(node) {
    node = config.rc.presets.html.reduce((convertedNode, converter) => {
      return converter(convertedNode, classes, minify, verbose);
    }, node);

    if (node.childNodes && node.childNodes.length) {
      node.childNodes = node.childNodes.map((childNode) => processNode(childNode));
    }

    return node;
  }

  return htmlmin(html.serialize(processNode(htmlAst)));
}

module.exports = htmlProcessor;