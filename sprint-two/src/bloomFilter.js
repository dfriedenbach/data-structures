var wordList = require('word-list-json');

var BloomFilter = function(m, k) {
  var newBloomFilter = {};
  var filter = [];
  var hashes = [];

  for (var i = 0; i < m; i++) {
    filter.push(false);
  }
  for (var i = 0; i < k; i++) {
    hashes.push(Hash());
  }

  newBloomFilter.addToFilter = function(value) {
    hashes.forEach(function(hash) {
      filter[hash.getHash(value, m)] = true;
    });
  };

  newBloomFilter.checkFilter = function(value) {
    var inSet = true;
    hashes.forEach(function(hash) {
      if (filter[hash.getHash(value, m)] === false) {
        inSet = false;
      }
    });
    return inSet;
  };

  return newBloomFilter;
}

var Hash = function() {
  var newHash = {};
  var rando = Math.random();

  newHash.getHash = function(str, max){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash<<5) + hash + str.charCodeAt(i) * rando;
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    return hash % max;
  };
  return newHash;
}


var testFilter = function () {
  var matches = 0;
  var testFilter = BloomFilter(18, 3);
  testFilter.addToFilter('asdfasdfasd');
  testFilter.addToFilter('savbasbsags');
  testFilter.addToFilter('kslanlwgjljg');
  testFilter.addToFilter('zxciouvawjanv');
  testFilter.addToFilter('izxoucwababqnda');
  for (var i = 0; i < 10000; i++) {
    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    if (testFilter.checkFilter(randomWord)) {
      matches++;
    }
  }
  return matches;
}

var matches = 0;
for (var i = 0; i < 10; i++) {
  matches += testFilter();
}
console.log(matches);