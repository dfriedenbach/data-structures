var RedBlackTree = function(value) {
  var newTree = {};
  if (value === undefined) {
    newTree.root = null;
  } else {
    newTree.root = Node(value, newTree);
  }
  return _.extend(newTree,RedBlackTree.prototype);
};

var Node = function(value, tree) {
  var newNode = {};

  newNode.value = value;
  newNode.tree = tree;
  newNode.isRed = false;
  newNode.parent = null;
  newNode.left = null;
  newNode.right = null;

  return _.extend(newNode, Node.prototype);
}

Node.prototype = {
  insert: function(value) {
    if (value >= this.value) {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = Node(value,this.tree);
        this.right.isRed = true;
        this.right.parent = this;
        // check colors
        this.right.checkColors();
      }
    } else {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = Node(value,this.tree);
        this.left.isRed = true;
        this.left.parent = this;
        // check colors
        this.left.checkColors();
      }
    }
  },

  findRoot: function(){
    if (this.parent){
      return this.parent.findRoot();
    }else{
      return this;
    }
  },

  rotateRightLeft: function(){
    this.parent.left = this.right;
    if (this.right) {
      this.right.parent = this.parent;
    }
    this.right = this.parent;
    this.parent = this.parent.parent;
    this.right.parent = this;
    if (this.parent) {
      this.parent.left = this;
    }
    return this;
  },

  rotateRightRight: function(){
    this.parent.right = this.left;
    if (this.left) {
      this.left.parent = this.parent;
    }
    this.left = this.parent;
    this.parent = this.parent.parent;
    this.left.parent = this;
    if (this.parent) {
      this.parent.right = this;
    }
    return this;
  },

  rotateLeftLeft: function(){
    this.parent.left = this.right;
    if (this.right) {
      this.right.parent = this.parent;
    }
    this.right = this.parent;
    this.parent = this.parent.parent;
    this.right.parent = this;
    if (this.parent) {
      this.parent.right = this;
    }
    return this;
  },

  rotateLeftRight: function(){
    this.parent.right = this.left;
    if (this.left) {
      this.left.parent = this.parent;
    }
    this.left = this.parent;
    this.parent = this.parent.parent;
    this.left.parent = this;
    if (this.parent) {
      this.parent.left = this;
    }
    return this;
  },

  checkColors: function() {
    var uncle;
    var grandparent;

    if (this.parent){
      grandparent = this.parent.parent;
      if (this.isRed && this.parent.isRed) {
        // check uncle
        if (grandparent.left === this.parent) {
          // LEFT SIDE
          uncle = grandparent.right;
          if (uncle && uncle.isRed) {
            // swap colors
            uncle.isRed = false;
            this.parent.isRed = false;
            grandparent.isRed = true;
            grandparent.checkColors();
          } else {
            // rotate (2 cases)
            if (this.parent.left === this){
              // LEFT LEFT CASE
              this.parent.rotateLeftLeft();
              this.parent.isRed = false;
              grandparent.isRed = true;
            }else{
              // LEFT RIGHT CASE
              this.rotateLeftRight();
              this.rotateLeftLeft();
              this.isRed = false;
              grandparent.isRed = true;
            }
          }
        } else {
          // RIGHT SIDE
          uncle = grandparent.left;
          if (uncle && uncle.isRed) {
            // swap colors
            uncle.isRed = false;
            this.parent.isRed = false;
            grandparent.isRed = true;
            grandparent.checkColors();
          } else {
            // rotate (2 cases)
            if (this.parent.right === this){
              // RIGHT RIGHT CASE
              this.parent.rotateRightRight();
              this.parent.isRed = false;
              grandparent.isRed = true;
            }else{
              // RIGHT LEFT CASE
              this.rotateRightLeft();
              this.rotateRightRight();
              this.isRed = false;
              grandparent.isRed = true;
            }
          }
        }
      }
    }else{
      this.isRed = false;
    }
    this.tree.root = this.findRoot();
  }
}

RedBlackTree.prototype = {
  insert: function(value) {
    if(!this.root) {
      this.root = Node(value);
    } else {
      this.root.insert(value);
    }
  },

  
}