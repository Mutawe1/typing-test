
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
var mongoose= require("mongoose");
var paragraph= require("./models/paragraph");
var paragraphService= require('./services/paragraphService');

//Specify port for use in heroku
var port = process.env.PORT || 8080;

for (var key in paragraphService) {
    console.log(key);
    //if (object.hasOwnProperty(key)) {
      //  var element = object[key];
        
    //}
}
server.use(cors());
//connect to Mongo Server
mongoose.connect("mongodb://ttuser:awsd_9@ds051378.mongolab.com:51378/typing-test");


//Routes 
//
server.get('/', function (req, res) {
    console.log("I just got a request !");
    res.send("Hello World");
});

//
server.get('/tests', function(req, res){
    
    console.log("Get all tests");
    paragraphService.getAllParagraphs().exec(function(err, results){
        
        res.json(results);
    });
      
        
    
});

console.log(paragraphService);

//Take test API that will take the pargraph ID
server.get("/test/:p", function (req, res) {
    console.log("new request!");
   
    /*fs.readFile("config.json", function (err, data) {
        var paragraphExists = false;
        console.log(data);
        if (err) res.send(err);

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
    });  */
    
    paragraphService.getParagraphById(req.params['p']).exec(function(err, result){
        if(err) res.send(err);
        
        else res.json(result);
    })
});

server.listen(port, function () {
    console.log("Express is listening for requests ! : " + port);
});

