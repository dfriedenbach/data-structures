var BinarySearchTree = function(value){
  var bst = {};

  bst.value = value;
  bst.left = null;
  bst.right = null;

  bst.insert = function(value) {
    if (value >= bst.value) {
      if(bst.right === null) {
        bst.right = BinarySearchTree(value);
      } else {
        bst.right.insert(value);
      }
    } else {
      if(bst.left === null) {
        bst.left = BinarySearchTree(value);
      } else {
        bst.left.insert(value);
      }
    }
  };

  bst.contains = function(value) {
    if (value === bst.value) {
      return true;
    } else if (value >= bst.value) {
      return !!bst.right && bst.right.contains(value);
    } else {
      return !!bst.left && bst.left.contains(value);
    }
  };

  bst.depthFirstLog = function(callback) {
    callback(bst.value);
    if (bst.left) {
      bst.left.depthFirstLog(callback);
    }
    if (bst.right) {
      bst.right.depthFirstLog(callback);
    }
  };

  return bst;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
