vsaa-server-nodejs
==================

Very Simple Application Analytics server made using Node.js, Restify, MySQL and OAuth.

Intented to run in conjuction with [vsaa](https://github.com/eimink/vsaa) application plugin.

Based on examples from
[restify-oauth2](https://github.com/domenic/restify-oauth2) and 
[node-mysql-json-server](https://github.com/frodefi/node-mysql-json-server).

This project depends on several npm packages. Make sure you have npm packages restify, restify-oauth2, underscore, crypto and mysql installed before trying to run it.

v.0.0.1
---
Initial commit with two REST entry points:

* /login for authentication
* /event for storing events to database

