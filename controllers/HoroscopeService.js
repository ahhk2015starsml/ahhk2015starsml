'use strict';

exports.getHoroscope = function(personaId) {

  var examples = {};
  
  examples['application/json'] = {
  "mlScore" : 1.3579000000000001069366817318950779736042022705078125,
  "icon" : "aeiou",
  "id" : "aeiou",
  "content" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
