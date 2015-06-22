// Database related
'use strict';

var mysql   = require('mysql')
  , dbconnection = mysql.createConnection(config.mysql);
dbconnection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) {
    console.log("Error while connecting to database.");
  } else {
    console.log("Database connection successful.");
  }
});



function handleDisconnect(dbconnection) {
  dbconnection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    dbconnection = mysql.createConnection(dbconnection.config);
    handleDisconnect(dbconnection);
    dbconnection.connect();
  });
}

handleDisconnect(dbconnection);

exports.createEvent = function (data, callback) {
	// Inserting our data and making sure it goes under correct app by FK
	var sql = 'INSERT INTO Events SET DeviceIdentifier =' + dbconnection.escape(data[0]) +
			  ',Description = '+ dbconnection.escape(data[1])+
			  ', Applications_Id = (SELECT Id FROM Applications WHERE ApiKey = '+dbconnection.escape(data[2])+')';
	dbconnection.query(sql, callback);
};

exports.getApps = function (callback) {
	dbconnection.query('SELECT ApiKey, ApiSecret FROM Applications', callback);
}
exports.getAppID = function (data,callback){
  var sql = 'SELECT Id FROM Applications WHERE ApiKey = ' +dbconnection.escape(data)
  dbconnection.query(sql, callback);
}

exports.getFBToken = function (data,callback){
  var sql = 'SELECT Token,User_Id FROM Facebook WHERE UniqueID = ' + dbconnection.escape(data)
  dbconnection.query(sql, callback);
}
exports.setFBToken = function (data,callback){
  var sql = 'INSERT INTO Facebook (User_Id, Token, UniqueID) VALUES ('+dbconnection.escape(data[0])+','+
  dbconnection.escape(data[1])+','+dbconnection.escape(data[2])+') ON DUPLICATE KEY UPDATE Token = ' +dbconnection.escape(data[1])
  dbconnection.query(sql, callback);
}

exports.getUserID = function (data,callback){
  var sql = 'SELECT Id,Name FROM User WHERE Id = ' + dbconnection.escape(data)
  dbconnection.query(sql, callback);
}
exports.getUserIDByFBID = function (data,callback){
  var sql = 'SELECT Id,Name FROM User INNER JOIN Facebook ON User.ID = Facebook.User_ID WHERE UniqueId = ' + dbconnection.escape(data)
  dbconnection.query(sql, callback);
}
exports.setUserID = function (data, callback){
  var sql = 'INSERT INTO User (Name, Password,Salt, Applications_Id, Id) VALUES ('+dbconnection.escape(data[0])+','+dbconnection.escape(data[1])+
  ','+dbconnection.escape(data[2])+','+dbconnection.escape(data[3])+','+dbconnection.escape(data[4])+')'
  dbconnection.query(sql, callback);
}
exports.setPicture = function (data, callback) {
  // Inserting our data and making sure it goes under correct app by FK
  var sql = 'INSERT INTO Metadata SET data=' + dbconnection.escape(data[0]) +
        ',User_Id = '+ dbconnection.escape(data[1])+
        ', Applications_Id = (SELECT Id FROM Applications WHERE ApiKey = '+dbconnection.escape(data[2])+')';
  dbconnection.query(sql, callback);
};
exports.getPicture = function (data, callback) {
  // Inserting our data and making sure it goes under correct app by FK
  var sql = 'SELECT data FROM Metadata WHERE User_Id =' + dbconnection.escape(data[0]);
  dbconnection.query(sql, callback);
};
