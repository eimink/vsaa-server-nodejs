"use strict";

// Configuration
global.config = require("./config");

global.db = require("./databases/"+config.db_driver); // This is a bit of a hack and outdated way of doing things...

// Required node modules
global.restify = require("restify");
global.restifyOAuth2 = require("restify-oauth2");
var cluster = require('cluster');
var hooks = require("./hooks/hooks");
var events = require("./hooks/event");
var initials = require("./hooks/initial");
var facebook = require("./hooks/facebook");
var picture = require("./hooks/picture");
var relationship = require("./hooks/relationship");
var group = require("./hooks/group");

// Process variables

var server = restify.createServer({
	name: "Very Simple Application Analytics Server",
	version: "0.0.3",
	formatters: {
		"application/hal+json": function (req, res, body) {
			return res.formatters["application/json"](req, res, body);
		}
	}
});

var port = config.listen; // Default port to listen

if (process.argc >= 2) {
	port = parseInt(process.argv[2]); // Port can be also passed as an argument, this overrides config...
}

global.RESOURCES = Object.freeze({
	INITIAL: "/",
	TOKEN: "/login",
	EVENT: "/event",
	FB: "/fbtoken",
	SETPICTURE: "/setpicture",
	GETPICTURE: "/getpicture",
	SETRELATIO: "/setrelatio",
	GETRELATIO: "/getrelatio",
	GETUSER: "/getuser",
	GETUSERS: "/getusers",
	DROPRELATIO: "/droprelatio"
	GETGROUPID: "/getgroupid",
	GETUSERSGROUPS: "/getusersgroup",
	GETNEWGROUPS:"/getnewgroups",
	GETGROUPS:"/getgroups",
	GETGROUP:"/getgroup",
	DESTROYGROUP:"/destroygroup",
	LEAVEGROUP:"/leavegroup",
	JOINGROUP:"/joingroup",
	CREATEGROUP:"/creategroup"
});

server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
	restifyOAuth2.cc(server, { tokenEndpoint: RESOURCES.TOKEN, hooks: hooks });

server.get(RESOURCES.INITIAL, initials.initialz);

server.post(RESOURCES.EVENT, events.eventlaunch);

server.post(RESOURCES.FB, facebook.tokenize);

server.post(RESOURCES.SETPICTURE, picture.setpicture);
server.post(RESOURCES.GETPICTURE, picture.getpicture);

server.post(RESOURCES.SETRELATIO, relationship.setRelatio);
server.post(RESOURCES.GETRELATIO, relationship.getRelatio);
server.post(RESOURCES.GETUSER, relationship.getUser);
server.post(RESOURCES.GETUSERS, relationship.getUsers);
server.post(RESOURCES.DROPRELATIO, relationship.dropRelatio);

server.post(RESOURCES.GETGROUPID, group.getGroupId);
server.post(RESOURCES.GETUSERSGROUPS, group.getUsersGroups);
server.post(RESOURCES.GETNEWGROUPS, group.getNewGroups);
server.post(RESOURCES.GETGROUPS, group.getGroups);
server.post(RESOURCES.GETGROUP, group.getGroup);
server.post(RESOURCES.DESTROYGROUP, group.destroyGroup);
server.post(RESOURCES.LEAVEGROUP, group.leaveGroup);
server.post(RESOURCES.JOINGROUP, group.joinGroup);
server.post(RESOURCES.CREATEGROUP, group.createGroup);

// Adding error information output, and killing process when this happens.
process.on('uncaughtException', function (err) {
	console.log("UNCAUGHT EXCEPTION ");
	console.log("[Inside 'uncaughtException' event] " + err.stack || err.message);
	process.exit(1);
});

// Clustering to utilize all CPU cores
if (cluster.isMaster) {

    // Fork workers
    for (var i = 0; i < config.workers; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
    	console.log('Worker ' + worker.process.pid + ' died');
    	console.log('Spawining new worker...');
    	cluster.fork();
    });
}
else {
    server.listen(port);
}
