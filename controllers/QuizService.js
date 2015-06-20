'use strict';

var cps = require('cps-api');

// Creating a CPS connection
var cpsConn = new cps.Connection(
    'tcp://cloud-us-0.clusterpoint.com:9007',
    'ahhk2015starsml',
    //process.env.CPS_USERNAME,
    //process.env.CPS_PASSWORD,
    "ahhkuser",
    "ahhkpass",
    'document',
    'document/id',
    {account: 100586});

// Debug
cpsConn.debug = true;

var maxNumQuizes = 29;

var randSeed = 1;
function setRandSeed(seed) {
    randSeed = seed;
}

function getRandom() {
    var x = Math.sin(++randSeed) * 10000;
    return x - Math.floor(x);
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array, seed) {
    setRandSeed(seed);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(getRandom() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

exports.getQuiz = function (seed, size, offset, callback) {
    offset = offset % maxNumQuizes;
    seed = seed % 1000000;
    if (size > maxNumQuizes) {
        size = maxNumQuizes;
    }

    var rawIds = [];
    for (var i = 0; i < maxNumQuizes; ++i) {
        rawIds.push("quizId-" + i);
    }
    var shuffledIds = shuffleArray(rawIds, seed);

    var retrieveIds = [];
    for (var i = offset; i < offset + size; ++ i) {
        retrieveIds.push(shuffledIds[i % maxNumQuizes]);
    }
    //console.log("Retrieving ids: " + retrieveIds);

    var retrieveReq = new cps.RetrieveRequest(retrieveIds);
    cpsConn.sendRequest(retrieveReq, function (err, retrieveResp) {
        if (err) {
            console.log(err);
            return callback([]);
        }
        if (retrieveResp) {
            //console.log("CPS result: " + retrieveResp);
            var retVal = [];
            for (var i = 0; i < retrieveResp.results.document.length; ++i) {
                var result = retrieveResp.results.document[i];
                retVal.push({
                    "id": result.id,
                    "question": result.text,
                    "weights": {
                        "mind": result.weights[0],
                        "energy": result.weights[1],
                        "nature": result.weights[2],
                        "tactics": result.weights[3],
                        "identity": result.weights[4]
                    }
                });
            }
            //console.log("Converting result: " + retVal);
            return callback(retVal);
        } else {
            return callback([]);
        }
    }, 'json');
}
