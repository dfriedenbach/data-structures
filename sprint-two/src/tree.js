var Tree = function(value){
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me

  extend(newTree, treeMethods);
  return newTree;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var treeMethods = {};

treeMethods.addChild = function(value){
  this.children.push(Tree(value));
};

treeMethods.contains = function(target){
  var searchTree = function(tree) {
    if (tree.value === target) {
      return true;
    } else if (tree.children.length === 0) {
      return false;
    } else {
      var foundTarget = false;
      for (var i = 0; i < tree.children.length; i++) {
        if (searchTree(tree.children[i])) {
          foundTarget = true;
        }
      }
      return foundTarget;
    }
  }
  return searchTree(this);
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
