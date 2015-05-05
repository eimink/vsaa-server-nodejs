"use strict";

module.exports = {

	// Default port to listen
	listen : 8080,
	fb_id : "",
	fb_secret: "",
	// Database driver
	db_driver : "mysql",

	// MySQL specific
	mysql : {
		host : "localhost",
		user : "root",
		password : "Passw0rd",
		database : "VSAA"
	},

	// MongoDB specific
	mongodb_uri : "vsaa",

	// MSSQL specific
	mssql : {
    	user: "username",
    	password: "password",
    	server: "server", // You can use 'localhost\\instance' to connect to named instance
    	database: "VSAA",
    	options: {
        	encrypt: false // Use this if you're on Windows Azure
    	}
	},

	// Number of worker threads. Default is the number of CPUs.
	workers : require('os').cpus().length,
}
