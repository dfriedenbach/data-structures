var wordList = require('word-list-json');

var containsAnagram = function(bagLetters, word) {
  var lettersAvailable = {};
  bagLetters.forEach(function(bagLetter) {
    if (lettersAvailable[bagLetter] === undefined) {
      lettersAvailable[bagLetter] = 1;
    } else {
      lettersAvailable[bagLetter]++;
    }
  });
  for (var i = 0; i < word.length; i++) {
    var wordLetter = word.charAt(i);
    if (lettersAvailable[wordLetter]) {
      lettersAvailable[wordLetter]--;
    } else {
      return false;
    }
  }
  return true;
}

var scrabble = function(letterBag) {
  
  var matchList = [];

  for (var i = 0; i < (wordList.lengths[letterBag.length] || wordList.length); i++) {
    // magic happens
    var word = wordList[i];
    if (containsAnagram(letterBag, word)) {
      matchList.push(word);
    }
  }
  return matchList;
}
/*var stuff = 'ethylenediaminetetraacetates'.split('');
//var magic = scrabble(['a', 'x', 'b', 'e', 'e', 'e', 'e', 't', 'u', 'n', 'm', 'l', 'o', 'r']);
var magic = scrabble(stuff);
console.log(stuff);
console.log('scrabbled!');
magic.forEach(function(word){
  console.log(word);
});*/
