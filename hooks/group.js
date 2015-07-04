"use strict"

exports.createGroup = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var name = req.body.Name;
  var locatio = req.body.Locatio;
  var enddate = req.body.EndDate;
  var ApiKey = req.body.ApiKey;
  db.createGroup([name,enddate,locatio,userid], function(err,response){
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

exports.joinGroup = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var groupid = req.body.GroupID;
  var ApiKey = req.body.ApiKey;
  db.joinGroup([userid,GroupID], function(err,response){
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
exports.leaveGroup = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var groupid = req.body.GroupID;
  var ApiKey = req.body.ApiKey;
  db.leaveGroup([userid,groupid], function(err,response){
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
exports.destroyGroup = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var groupid = req.body.GroupID;
  var ApiKey = req.body.ApiKey;
  db.destroyGroup([userid,groupid], function(err,response){
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
exports.getGroup = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var groupid = req.body.GroupID;
  var ApiKey = req.body.ApiKey;
  db.getGroup(groupid, function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(response)
    }
  });
};
exports.getGroups = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var ApiKey = req.body.ApiKey;
  db.getGroups( function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(response)
    }
  });
};

exports.getNewGroups = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var ApiKey = req.body.ApiKey;
  db.getNewGroups(userid, function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(response)
    }
  });
};
exports.getUsersGroups = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var userid = req.body.UserID;
  var ApiKey = req.body.ApiKey;
  db.getUsersGroups(userid, function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(response)
    }
  });
};
exports.getGroupId = function (req, res){
  var response = {"Response":0};
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  if ( req.body === undefined)
  {
    return res.MissingParameterError();
  }
  var groupname = req.body.GroupName;
  var ApiKey = req.body.ApiKey;
  db.getGroupId(groupname, function(err,response){
    if(err){
      console.log("Set Relatio error");
      console.log(err);
      res.send(500);
      return;
    }else{
        console.log(200)
        res.send(response)
    }
  });
};
