"use strict";
var https = require('https');
var fs = require('fs');
var uuid = require('node-uuid');
var request = require('request');

exports.getpicture = function (req, res){

  //TODO: Get Picture
  //TODO: Return Picture
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var usertoken = req.body.Token;
  var userid = req.body.UserID;
  console.log(userid);
  var ApiKey = req.body.ApiKey;
  db.getPicture(userid, function(err,response){
    if(err){
      console.log("getpicture metadata error");
      res.send(500);
      return;
    }else{
        console.log(response)
	res.send(getpicture(response[0].Data))
    }
  });
  //TODO: Write test
};
exports.setpicture = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var usertoken = req.body.Token;
  var userid = req.body.UserID;
  var ApiKey = req.body.ApiKey;
  db.getFBTokenUID(userid,function(err,res){
    if(err){
      console.log("apikey error");
      res.send(500);
      return;
    }else{
    var id =res[0].User_Id
    var path = '/v2.3/me/picture?type=large&redirect=false&access_token=' +res[0].Token;
    fbcalls(path,function(response){
      console.log(response.data.url)
      request({
        url:response.data.url,
        encoding : null
        }, function(error, response, body) {
        console.log(body instanceof Buffer);
        var name = uuid.v4();
        db.setPicture([name,id,ApiKey], function(err,res){
          if(err){
	    console.log(err)
            console.log("save error");
            return 500
          }else{
          }
        });
        savepicture(name, body);
      });
      //TODO: Write test
    });
  }
  });
res.send(200);
};

function savepicture(picturename, picture){
  picturename = "/pictures/VSAA_" + picturename
  fs.writeFile(picturename, picture, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");

  });
}

function getpicture(picturename){
  picturename = "/pictures/VSAA_" + picturename
  return fs.readFileSync(picturename) 
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
