var Tree = function(value, parent){
  var newTree = {};
  newTree.value = value;
  newTree.parent = parent || null;

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
  this.children.push(Tree(value, this));
};

treeMethods.removeFromParent = function() {
  var index = this.parent.children.indexOf(this);
  this.parent.children.splice(index, 1);
  this.parent = null;
}

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

treeMethods.traverse = function(callback) {
  callback(this.value);
  this.children.forEach(function(tree) {
    tree.traverse(callback);
  });
}


/*
 * Complexity: What is the time complexity of the above functions?
 */
