var functional = {};
var funcShared = {};
var prototypal = {};
var pseudoclassical = {};
var styles = [functional, funcShared, prototypal, pseudoclassical];
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
functional.Queue = function(){
  var someInstance = {};
  var storage = {};
  var back = 0;
  var length = 0;
  someInstance.enqueue = function(value){
    storage[back] = value;
    back++;
    length++;
  };
  someInstance.dequeue = function(){
    if (length > 0) {
      var result = storage[back - length];
      delete storage[back - length];
      length--;
      return result;
    }
  };
  someInstance.size = function(){
    return length;
  };
  return someInstance;
};
////////////////////////////////////////////////////////////////////////////////
functional.Stack = function(){
  var someInstance = {};
  var storage = {};
  var length = 0;

  someInstance.push = function(value){
    storage[length] = value;
    length++;
  };
  someInstance.pop = function(){
    if (length > 0) {
      length--;
      return storage[length];
    }
  };
  someInstance.size = function(){
    return length;
  };
  return someInstance;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};
////////////////////////////////////////////////////////////////////////////////
funcShared.Queue = function(){
  var newQueue = {};
  newQueue.storage = {};
  newQueue.length = 0;
  newQueue.front = 0;

  extend(newQueue, funcShared.queueMethods);
  return newQueue;
};
funcShared.queueMethods = {};
funcShared.queueMethods.enqueue = function(value) {
  this.storage[this.length + this.front] = value;
  this.length++;
};
funcShared.queueMethods.dequeue = function() {
  if (this.length > 0) {
    var result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    this.length--;
    return result;
  }
};
funcShared.queueMethods.size = function() {
  return this.length;
};
////////////////////////////////////////////////////////////////////////////////
funcShared.Stack = function() {
  var newStack = {};
  newStack.storage = {};
  newStack.length = 0;
  extend(newStack, funcShared.stackMethods);
  return newStack;
};
funcShared.stackMethods = {};
funcShared.stackMethods.push = function(value) {
  this.storage[this.length] = value;
  this.length++;
};
funcShared.stackMethods.pop = function() {
  if (this.length > 0) {
    this.length--;
    return this.storage[this.length];
  }
};
funcShared.stackMethods.size = function() {
  return this.length;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
prototypal.Queue = function() {
  var newQueue = Object.create(prototypal.queueMethods);
  newQueue.length = 0;
  newQueue.front = 0;
  newQueue.storage = {};

  return newQueue;
};
prototypal.queueMethods = {};
prototypal.queueMethods.enqueue = function(value) {
  this.storage[this.front + this.length] = value;
  this.length++;
};
prototypal.queueMethods.dequeue = function() {
  if (this.length > 0) {
    var result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    this.length--;
    return result;
  }
};
prototypal.queueMethods.size = function() {
  return this.length;
};
////////////////////////////////////////////////////////////////////////////////
prototypal.Stack = function() {
  var newStack = Object.create(prototypal.stackMethods);
  newStack.storage = {};
  newStack.length = 0;
  return newStack;
};
prototypal.stackMethods = {};
prototypal.stackMethods.push = function(value) {
  this.storage[this.length] = value;
  this.length++;
};
prototypal.stackMethods.pop = function() {
  if (this.length > 0) {
    this.length--;
    return this.storage[this.length];
  }
};
prototypal.stackMethods.size = function() {
  return this.length;
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
pseudoclassical.Queue = function() {
  this.storage = {};
  this.length = 0;
  this.front = 0;
};
pseudoclassical.Queue.prototype.enqueue = function(value) {
  this.storage[this.front + this.length] = value;
  this.length++;
};
pseudoclassical.Queue.prototype.dequeue = function() {
  if (this.length > 0) {
    var result = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    this.length--;
    return result;
  }
};
pseudoclassical.Queue.prototype.size = function() {
  return this.length;
};
////////////////////////////////////////////////////////////////////////////////
pseudoclassical.Stack = function() {
  this.storage = {};
  this.length = 0;
};
pseudoclassical.Stack.prototype.push = function(value) {
  this.storage[this.length] = value;
  this.length++;
};
pseudoclassical.Stack.prototype.pop = function() {
  if (this.length > 0) {
    this.length--;
    return this.storage[this.length];
  }
};
pseudoclassical.Stack.prototype.size = function() {
  return this.length;
};
