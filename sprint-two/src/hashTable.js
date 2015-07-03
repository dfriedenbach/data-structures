var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  this._storage.get(i).push([k, v]);
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var retrieved = this._storage.get(i);
  var value;
  retrieved.forEach(function(tuple) {
    if (tuple[0] === k) {
      value = tuple[1];
    }
  });
  if (value === undefined) {
    value = null;
  }
  return value;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var tupleArray = this._storage.get(i);
  var index;
  tupleArray.forEach(function(tuple, key) {
    if (tuple[0] === k) {
      index = key;
    }
  });
  if (index !== undefined) {
    tupleArray.splice(index, 1);
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
