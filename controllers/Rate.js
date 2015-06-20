'use strict';

var url = require('url');


var Rate = require('./RateService');


module.exports.putRate = function putRate(req, res, next) {
    var personalityId = req.swagger.params['personalityId'].value;
    var horoscopeId = req.swagger.params['horoscopeId'].value;
    var rating = req.swagger.params['rating'].value;

    Rate.putRate(personalityId, horoscopeId, rating, function callback(result) {
        if (typeof result !== 'undefined') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result || {}, null, 2));
        }
        else {
            res.end();
        }
    });
};
