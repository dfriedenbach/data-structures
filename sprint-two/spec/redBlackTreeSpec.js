describe('red-black tree', function() {
  var redBlackTree;

  beforeEach(function() {
    redBlackTree = RedBlackTree(5);
  });

  it('should insert values at the correct location in the tree', function(){
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    redBlackTree.insert(6);
    expect(redBlackTree.root.left.value).to.equal(2);
    expect(redBlackTree.root.right.right.value).to.equal(7);
  });

  it('should properly color the nodes', function(){
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    redBlackTree.insert(6);
    expect(redBlackTree.root.isRed).to.equal(false);
    expect(redBlackTree.root.left.isRed).to.equal(false);
    expect(redBlackTree.root.right.right.isRed).to.equal(true);
  });

  it('should have a working "remove" method', function(){
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    expect(redBlackTree.contains(7)).to.equal(true);
    redBlackTree.remove(7);
    expect(redBlackTree.contains(7)).to.equal(false);
    expect(redBlackTree.root.right.right).to.equal(null);
  });

  it('should preserve the children after removing an inner node', function(){
    var array = [];
    var func = function(value){ array.push(value); };
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(6);
    redBlackTree.insert(7);
    redBlackTree.depthFirstLog(func);
    expect(array).to.eql([3,2,6,5,7]);
    redBlackTree.remove(6);
    array = [];
    redBlackTree.depthFirstLog(func);
    expect(array).to.eql([3,2,5,7]);
  });

});
