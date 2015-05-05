"use strict";
var http = require('http');
exports.tokenize = function (req, res) {
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var jsondata = JSON.parse(req.body.data)
  var usertoken = jsondata.usertoken;
  var path = '/oauth/access_token?grant_type=fb_exchange_token&client_id='+config.fb_id+
  '&client_secret='+config.fb_secret+'&fb_exchange_token='+usertoken;
  fbauthtoken(path,res,function(response,res){
    res.contentType = "application/hal+json";
    res.send(response);
  });
};


function fbauthtoken(callpath,res,callback) {

    return http.get({
        host: 'graph.facebook.com',
        path: callpath
    }, function(response,resp) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function(res) {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log(parsed);
            callback({
                parsed
            },res);
        });
    });

};
