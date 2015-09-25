var BinarySearchTree = function(value){
  var bst = {};

  bst.value = value;
  bst.left = null;
  bst.right = null;

  bst.leftDepth = 0;
  bst.rightDepth = 0;

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

    bst._fixBalance();
  };

  // move trees to new positions and fix their depths
  bst._fixBalance = function() {
    var check = function(node) {
      if (node.left === null) {
        node.leftDepth = 0;
      } else {
        node.leftDepth = 1 + check(node.left);
      }
      if (node.right === null) {
        node.rightDepth = 0;
      } else {
        node.rightDepth = 1 + check(node.right);
      }
      if (Math.abs(node.leftDepth - node.rightDepth) > 1) {
        node._rotate();
        return check(node);
      } else {
        return Math.max(node.leftDepth, node.rightDepth)
      }

    }
    check(bst);
  }

  bst._rotate = function() {
    var newParent;
    if (bst.leftDepth > bst.rightDepth) {
      // newParent = bst.left;
      // bst.left = bst.left.right;
      // newParent.right = bst;
      // bst = newParent;

      // get rightmost left child
      // set bst to temp
      // set child to bst
      if (bst.left.right === null) {
        bst.left.right = bst;
        bst = bst.left;
        bst.right.left = null;
      } else {
        var findRightmostChildParent = function(node) {
          if (node.right.right === null) {
            return node;
          } else {
            return findRightmostChildParent(node.right);
          }
        }
        var newRootParent = findRightmostChildParent(bst.left);
        var newRoot = newRootParent.right;
        var oldRoot = bst;
        newRootParent.right = newRoot.left;
        newRoot.left = oldRoot.left;
        oldRoot.left = null;
        newRoot.right = oldRoot;
        bst = newRoot;
      }
    } else {
      if (bst.right.left === null) {
        bst.right.left = bst;
        bst = bst.right;
        bst.left.right = null;
      } else {
        var findLeftmostChildParent = function(node) {
          if (node.left.left === null) {
            return node;
          } else {
            return findLeftmostChildParent(node.left);
          }
        }
        var newRootParent = findLeftmostChildParent(bst.right);
        var newRoot = newRootParent.left;
        var oldRoot = bst;
        newRootParent.left = newRoot.right;
        newRoot.right = oldRoot.right;
        oldRoot.right = null;
        newRoot.left = oldRoot;
        bst = newRoot;
      }
    }
  }

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
