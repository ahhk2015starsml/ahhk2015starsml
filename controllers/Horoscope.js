'use strict';

var url = require('url');


var Horoscope = require('./HoroscopeService');


module.exports.getHoroscope = function getHoroscope (req, res, next) {
  var personaId = req.swagger.params['personaId'].value;
  

  var result = Horoscope.getHoroscope(personaId);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
