"use strict";
var https = require('https');
var uuid = require('node-uuid');

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
  var ApiKey = req.body.ApiKey;
  var path = '/v2.3/oauth/access_token?grant_type=fb_exchange_token&client_id='+config.fb_id+
  '&client_secret='+config.fb_secret+'&fb_exchange_token='+usertoken;
  fbauthtoken(path,res,function(response){
    getself(response,ApiKey,function(response){
      res.contentType = "application/hal+json";
      var response = {"Token": response.token, "UserID":response.userID}
      res.send(response);
    });
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

function getself(fbtoken,ApiKey, callback){
  var path = '/v2.3/me?fields=id,name&access_token=' +fbtoken;
  var response = {}
  fbcalls(path,function(response){

    var uid = response.id;
    var name = response.name;
    db.getUserIDByFBID(uid, function(err,res){
      if(err){
        console.log("User ID by FBID Error");
        res.send(500);
        return;
      }else{
	console.log(res)
        if('undefined' !== typeof res[0]){
          var data = [res[0].Id,fbtoken,uid];
          response.userID = res[0].Id;
          response.token = fbtoken;
          db.setFBToken(data, function(err,res){
            if(err){
              console.log("Set FB token error");
              res.send(500);
               return;
               }
            else{
              console.log("ok user found");
              return callback(response);
            }
          });
        }else{
          db.getAppID(ApiKey, function(err,res){
            if(err){
              console.log("apikey error");
              res.send(500);
              return;
            }else{
              var userid = uuid.v4();
              response.userID = userid;
              var data=[name, "facebookauthed","facebookauthed",res[0].Id,userid]
              db.setUserID(data,function(err,res){
                if(err){
                  console.log("Set user error");
	   	            console.log(err)
                  res.send(500);
                   return;
                   }
                else{
                  console.log(res);
                  var data = [userid,fbtoken,uid];
                  db.setFBToken(data, function(err,res){
                    if(err){
                      console.log("Set FB token error");
                      res.send(500);
                       return;
                       }
                    else{
                      console.log("ok");
                      response.token = fbtoken;
                      callback(response);
                    }
                  });
                }
          });
        }
        });
        }
      }
    });
  });
}


function fbcalls(callpath,callback) {

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
            callback(parsed);
        });
    });

};
