"use strict";

exports.setRelatio = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var friendid = req.body.FriendID;
  var value = req.body.Value;
  console.log(userid);
  console.log(friendid);
  console.log(value);
  var ApiKey = req.body.ApiKey;
  db.setRelations([userid,friendid,value], function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(200)
    }
  });
};

exports.dropRelatio = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var friendid = req.body.FriendID;
  var ApiKey = req.body.ApiKey;
  db.dropRelatio([userid,friendid,], function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(200)
    }
  });
};


exports.getRelatio = function (req, res){

  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  console.log(userid);
  var ApiKey = req.body.ApiKey;
  //TODO Get Relatios
  db.getRelations(userid, function(err,response){
    if(err){
      console.log("Get Users error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(response)
        res.send(response)
    }
  });
};


exports.getUser = function (req, res){

  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  console.log(userid);
  var ApiKey = req.body.ApiKey;

  db.getUser(userid, function(err,response){
    if(err){
      console.log("Get User error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(response[0])
        res.send(response[0])
    }
  });
};


exports.getUsers = function (req, res){


  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  console.log(userid);
  var ApiKey = req.body.ApiKey;
  db.getUsers(userid, function(err,response){
    if(err){
      console.log("Get Users error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(response)
        res.send(response)
    }
  });
};
