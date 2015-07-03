var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    if (list.tail === null) {
      list.tail = Node(value);
      list.head = list.tail;
    } else {
      list.tail.next = Node(value);
      list.tail.next.previous = list.tail;
      list.tail = list.tail.next; 
    }
  };

  list.addToHead = function(value) {
    if (list.head === null) {
      list.head = Node(value);
      list.tail = list.head;
    } else {
      list.head.previous = Node(value);
      list.head.previous.next = list.head;
      list.head = list.head.previous; 
    }
  }

  list.removeHead = function(){
    if (list.head) {
      var result = list.head.value;
      if (list.head.next !== null) {
        list.head.next.previous = null;
        list.head = list.head.next;
      } else {
        list.head = null;
        list.tail = null;
      }
      return result;
    }
  };

  list.removeTail = function() {
    if (list.tail) {
      var result = list.tail.value;
      if (list.tail.previous !== null) {
        list.tail.previous.next = null;
        list.tail = list.tail.previous;
      } else {
        list.head = null;
        list.tail = null;
      }
      return result;
    }
  }
  
  list.contains = function(target){
    var checkNode = function(node) {
      if (node.value === target) {
        return true;
      } else if (node.next === null) {
        return false;
      } else {
        return checkNode(node.next);
      }
    }

    return checkNode(list.head);
  };

  return list;
};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;
  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
