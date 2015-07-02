var Queue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = {};
  newQueue.storage = {};
  newQueue.length = 0;
  newQueue.front = 0;

  extend(newQueue, queueMethods);
  return newQueue;
};

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[this.length + this.front] = value;
  this.length++;
}

queueMethods.dequeue = function() {
  if (this.length > 0) {
    var result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    this.length--;
    return result;
  }
}

queueMethods.size = function() {
  return this.length;
}
