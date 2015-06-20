'use strict';

exports.getQuiz = function(seed, size, offset) {

  var examples = {};
  
  examples['application/json'] = [ {
  "question" : "aeiou",
  "id" : "aeiou",
  "weights" : {
    "mind" : 123,
    "identity" : 123,
    "tactics" : 123,
    "energy" : 123
  }
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
