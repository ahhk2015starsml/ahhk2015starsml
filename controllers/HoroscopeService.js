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
    console.log("Retrieving personality id=" + personalityId);
    var retrieveReq = new cps.RetrieveRequest(personalityId);
    cpsConn.sendRequest(retrieveReq, function (err, retrieveResp) {
        if (err) {
            console.log(err);
            return callback(null);
        }
        if (retrieveResp) {
            console.log("Retrieving personality " + JSON.stringify(retrieveResp.results));
            var personality = retrieveResp.results.document;

            // TODO: add machine learning algorithm api call here
            // for now just get everything and return one

            getOneHoroscope(personality, callback);
        } else {
            return callback(null);
        }
    }, 'json');
}

function getOneHoroscope(personality, callback) {
    var randIndexVal = Math.floor(Math.random() * maxNumHoroscopes);
    console.log("Retrieving Horoscope id=" + randIndexVal);
    var retrieveReq = new cps.RetrieveRequest("hId-" + randIndexVal);
    cpsConn.sendRequest(retrieveReq, function (err, retrieveResp) {
        if (err) {
            console.log(err);
            return callback(null);
        }
        if (retrieveResp) {
            console.log("Retrieved Horoscope item " + JSON.stringify(retrieveResp.results));
            var hEntry = retrieveResp.results.document[0];
            var retVal = {
                "id": hEntry.id,
                "content": hEntry.text,
                "icon": "string",
                "mlScore": 0
            };
            return callback(retVal);
        } else {
            return callback(null);
        }
    }, 'json');
}