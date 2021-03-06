'use strict';

function defaultJsConverter(rootNode, classes, minifyFn, verbose) {
  let comment;
  let lastCommentLine = 0;

  function callExprHasComment(callExprNode) {
    const callExprComment = getCommentMarker(callExprNode.callee.object);

    return callExprComment && commentApplies(callExprNode, callExprComment.loc.end.line);
  }

  function commentApplies(node, commentLine) {
    return node.loc && node.loc.start.line <= commentLine + 1 && node.loc.start.line >= commentLine;
  }

  function getCommentMarker(node) {
    return node && Array.isArray(node.comments) && node.comments.find((comment) => {
      return comment.value && comment.value.match(/^[\s\t\n]*uglicssy/);
    });
  }

  function isCallExpr(node) {
    return node && node.type === 'CallExpression';
  }

  function convertNode(node) {
    if (!isObject(node)) {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map((subNode) => convertNode(subNode));
    }

    if (isCallExpr(node) && node.arguments && callExprHasComment(node)) {
      node.arguments = node.arguments.map((argument) => {
        argument.value = minifyFn(argument.value, classes);
        return argument;
      });
    }

    comment = getCommentMarker(node);

    if (comment) {
      lastCommentLine = comment.loc.end.line;
    }

    if (lastCommentLine && commentApplies(node, lastCommentLine) && node.type === 'Literal') {
      const value = minifyFn(node.value, classes);

      verbose.printConverted(node.value, value, defaultJsConverter);
      
      node.value = value;
    }

    for (let property in node) {
      if (node.hasOwnProperty(property) && property !== 'loc') {
        if (isObject(node[property])) {
          node[property] = convertNode(node[property]);
        }
      }
    }

    return node;
  }

  function isObject(node) {
    return node === Object(node);
  }

  return convertNode(rootNode);
}

module.exports = defaultJsConverter;