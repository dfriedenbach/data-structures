var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._population = 0;
  this._upperThreshold = 0.75;
  this._lowerThreshold = 0.25;
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  this._storage.get(i).push([k, v]);
  this._population += 1;

  if (this._population / this._limit > this._upperThreshold) {
    this._repopulate(this._limit * 2);
  }
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
    this._population--;
    if (this._limit > 8 && this._population / this._limit < this._lowerThreshold) {
      this._repopulate(this._limit / 2);
    }
  }


};

HashTable.prototype._repopulate = function(newLimit) {
  this._limit = newLimit;
  this._population = 0;
  var oldStorage = this._storage;
  this._storage = LimitedArray(this._limit);
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }  

  var myself = this;
  oldStorage.each(function(bucket) {
    bucket.forEach(function(tuple) {
      HashTable.prototype.insert.apply(myself, tuple);
    });
  });
}



/*
 * Complexity: What is the time complexity of the above functions?
 */
