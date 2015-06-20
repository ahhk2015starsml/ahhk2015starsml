'use strict';

var url = require('url');


var Quiz = require('./QuizService');


module.exports.postPersona = function postPersona (req, res, next) {
  var seed = req.swagger.params['seed'].value;
  var size = req.swagger.params['size'].value;
  var offset = req.swagger.params['offset'].value;
  

  var result = Quiz.postPersona(seed, size, offset);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
