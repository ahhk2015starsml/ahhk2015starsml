'use strict';

var url = require('url');


var Quiz = require('./QuizService');


module.exports.getQuiz = function getQuiz(req, res, next) {
    var seed = req.swagger.params['seed'].value;
    var size = req.swagger.params['size'].value;
    var offset = req.swagger.params['offset'].value;

    Quiz.getQuiz(seed, size, offset, function callback(result) {
        if (typeof result !== 'undefined') {
            //console.log("Sending Results: " + result);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result || {}, null, 2));
        }
        else {
            res.end();
        }
    });
};
