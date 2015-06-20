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

exports.postPersonality = function (body, callback) {
    // In Cloud version autoincrement is not yet implemented - a unique Document ID
    // should be generated 'manually'. Using timestamp, for example.

    // should be an upsert if using mongodb, instead this db is incomplete
    var myId = body.birthday + ":"
        + body.weightings.mind + ""
        + body.weightings.energy + ""
        + body.weightings.nature  + ""
        + body.weightings.tactics + ""
        + body.weightings.identity + ":"
        + new Date().getTime();

    var insertDoc = {
        "id": myId,
        "birthday": body.birthday,  // should be format '2015-06-20'
        "weightings": [
            body.weightings.mind,
            body.weightings.energy,
            body.weightings.nature,
            body.weightings.tactics,
            body.weightings.identity],
        "locationLongitude": body.locationLongitude,
        "locationLatitude": body.locationLatitude,
        "social": body.social
    };
    var insertRequest = new cps.InsertRequest(insertDoc);
    cpsConn.sendRequest(insertRequest, function (err, insertResponse) {
        if (err) {
            console.error(err);
            return callback(null);
        }
        console.log("Posting Personality: " + JSON.stringify(insertResponse));
        return callback(myId);
    });
}
