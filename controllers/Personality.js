'use strict';

var url = require('url');


var Personality = require('./PersonalityService');


module.exports.postPersonality = function postPersonality (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Personality.postPersonality(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
