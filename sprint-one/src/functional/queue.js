var Queue = function(){

  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var back = 0;
  var length = 0;

  // Implement the methods below

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
