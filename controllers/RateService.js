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

exports.putRate = function(personalityId, horoscopeId, rating, callback) {
  var myId = "rId-" + new Date().getTime() + ":"
  + personalityId + ":"
  + horoscopeId + ":"
  + rating;
  var insertDoc = {
    "id": myId,
    "personalityId": personalityId,
    "horoscopeId": horoscopeId,
    "rating": rating
  };
  var insertRequest = new cps.InsertRequest(insertDoc);
  cpsConn.sendRequest(insertRequest, function (err, insertResponse) {
    if (err) {
      console.error(err);
      return callback(null);
    }
    //console.log("Posting Personality: " + JSON.stringify(insertResponse));
    return callback(myId);
  });
}
