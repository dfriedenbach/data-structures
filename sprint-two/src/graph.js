

var Graph = function(){
  this.nodeList = {};
};

Graph.prototype.addNode = function(node){
  this.nodeList[node] = [];
};

Graph.prototype.contains = function(node){
  var found = false;
  this.forEachNode(function (key) {
    found = found || node === key;
  });
  return found;
};

Graph.prototype.removeNode = function(node){
  delete this.nodeList[node];
};

Graph.prototype.hasEdge = function(fromNode, toNode){
  var found = false;
  this.nodeList[fromNode].forEach(function (item) {
    found = found || item === toNode;
  });
  return found;
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.nodeList[fromNode].push(toNode);
  this.nodeList[toNode].push(fromNode);
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  if (this.nodeList[fromNode].indexOf(toNode) >= 0) {
    var index = this.nodeList[fromNode].indexOf(toNode);
    this.nodeList[fromNode].splice(index, 1);
    index = this.nodeList[toNode].indexOf(fromNode);
    this.nodeList[toNode].splice(index, 1);
  }
};

Graph.prototype.forEachNode = function(cb){
  for (var key in this.nodeList) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */



