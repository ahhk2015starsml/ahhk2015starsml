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

var maxNumHoroscopes = 24;

exports.getHoroscope = function (personalityId, callback) {
    //console.log("Retrieving personality id=" + personalityId);
    var retrieveReq = new cps.RetrieveRequest(personalityId);
    cpsConn.sendRequest(retrieveReq, function (err, retrieveResp) {
        if (err) {
            console.log(err);
            return callback(null);
        }
        if (retrieveResp) {
            //console.log("Retrieving personality " + JSON.stringify(retrieveResp.results));
            var personality = retrieveResp.results.document[0];
            getOneHoroscope(personality, callback);
        } else {
            return callback(null);
        }
    }, 'json');
}

function getOneHoroscope(personality, callback) {
    //console.log("Retrieved getOneHoroscope item " + JSON.stringify(personality));
    var retrieveIds = [];
    for (var i = 0; i < maxNumHoroscopes; ++ i) {
        retrieveIds.push("hId-" + i);
    }

    //console.log("Retrieved Horoscope item " + JSON.stringify(retrieveIds));
    var retrieveReq = new cps.RetrieveRequest(retrieveIds);
    cpsConn.sendRequest(retrieveReq, function (err, retrieveResp) {
        if (err) {
            console.log(err);
            return callback(null);
        }
        if (retrieveResp) {
            // pId-1434854946133:2015-06-13:1-22-11
            //console.log("Retrieved Horoscope item " + JSON.stringify(retrieveResp.results));

            // machine learning magic
            // calculate squared errors
            var minLeastSquaredErrors = {index: -1, value: 0};
            //console.log("Retrieved min least squared errors " + JSON.stringify(minLeastSquaredErrors));
            for (var i = 0; i < retrieveResp.results.document.length; ++i) {
                var hEntry = retrieveResp.results.document[i];
                var leastSquareError =
                    (personality.weightings[0] - hEntry.weights[0]) ^ 2 +
                    (personality.weightings[1] - hEntry.weights[1]) ^ 2 +
                    (personality.weightings[2] - hEntry.weights[2]) ^ 2 +
                    (personality.weightings[3] - hEntry.weights[3]) ^ 2 +
                    (personality.weightings[4] - hEntry.weights[4]) ^ 2;
                //console.log("Retrieved least squared error value = " + JSON.stringify([i, leastSquareError]));
                if (minLeastSquaredErrors.index < 0 || minLeastSquaredErrors.value > leastSquareError) {
                    minLeastSquaredErrors.index = i;
                    minLeastSquaredErrors.value = leastSquareError;
                }
            }
            //console.log("Retrieved min least squared errors " + JSON.stringify(minLeastSquaredErrors));

            if (minLeastSquaredErrors[0] < 0) {
                return callback(null);
            } else {
                var retVal = {
                    "id": retrieveResp.results.document[minLeastSquaredErrors.index].id,
                    "content": retrieveResp.results.document[minLeastSquaredErrors.index].text,
                    "mlScore": minLeastSquaredErrors.value
                };
                return callback(retVal);
            }
        } else {
            return callback(null);
        }
    }, 'json');
}