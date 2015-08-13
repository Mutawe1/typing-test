
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require("fs");
var server = express();
var cors = require("cors");


server.use(cors());

server.get('/', function (req, res) {
    console.log("I just got a request !");
    res.send("Hello World");
});


//Take test API that will take the pargraph ID
server.get("/test/:p", function (req, res) {
    console.log("new request!");
    
    fs.readFile("config.json", function (err, data) {
        var paragraphExists = false;

        JSON.parse(data, function (k, v) {
            if (k === req.params["p"]) {
                res.send(v);
                paragraphExists = true;
            }
            
           
        });

        if (!paragraphExists) {
            res.send("No Such file");
        }

        //var a = JSON.parse(data);
        //res.send(a["tests"][0].paragraph1);  
      });  
});

server.listen(3002, function () {
    console.log("Express is listening for requests !");
});

