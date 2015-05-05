"use strict";
var https = require('https');

exports.tokenize = function (req, res) {
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var usertoken = req.body.usertoken;
  var path = '/v2.3/oauth/access_token?grant_type=fb_exchange_token&client_id='+config.fb_id+
  '&client_secret='+config.fb_secret+'&fb_exchange_token='+usertoken;
  fbauthtoken(path,res,function(response){
    res.contentType = "application/hal+json";
    res.send(response);
  });
};


function fbauthtoken(callpath,res,callback) {

    return https.get({
        host: 'graph.facebook.com',
        path: callpath
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log(parsed);
            callback(parsed.access_token);
        });
    });

};
