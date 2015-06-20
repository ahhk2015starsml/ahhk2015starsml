var express = require('express');
var cps = require('cps-api');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// Creating a CPS connection
var cpsConn = new cps.Connection('tcp://cloud-us-0.clusterpoint.com:9007', 'ahhk2015starsml', "username", "password", 'document', 'document/id', {account: 100586});

// Debug
cpsConn.debug = true;

// Insert
/*
var id = 1;
var name = "Username";
var insert_request = new cps.InsertRequest('<document><id>'+id+'</id>'+cps.Term(name, "name")+'</document>');
cpsConn.sendRequest(insert_request, function(err, insert_response) {
  if (err)
    return console.error(err);
  console.log('New user registered: ' + insert_response.document.id);
});
*/
var retrieve_req = new cps.RetrieveRequest('1');
cpsConn.sendRequest(retrieve_req, function (err, retrieve_resp) {
  if (err) return console.log(err);
  if (retrieve_resp) {
    console.log(retrieve_resp.results.document[0].id);
  }
}, 'json');