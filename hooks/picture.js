"use strict";
var https = require('https');
var fs = require('fs');
var uuid = require('node-uuid');
var request = require('request');

exports.getpicture = function (req, res){
  //TODO: Get Picture
  //TODO: Return Picture
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
  db.getFBToken(userid,function(err,res){
    var id =res[0].User_Id
    var path = '/v2.3/me/picture?type=large&redirect=false&access_token=' +res[0].Token;
    fbcalls(path,function(response){
      url = response.data.url
      //TODO: Download picture with request (http://stackoverflow.com/questions/22187065/download-image-from-url-using-request-and-save-to-variable)
      //TODO: Save Picture
      //TODO: Save Metadata
      //TODO: Write test
    });
  });
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
  fs.readFile(picturename , function read(err, data) {
      if (err) {
          throw err;
      }
      content = data;
     return content;
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
