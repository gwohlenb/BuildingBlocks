var express = require('express')
var bodyParser = require('body-parser')
var urlEncode = bodyParser.urlencoded({extended: false});

var redis = require("redis")
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  // Select the development database version (as opposed to 'test')
  // (length is just a quick and dirty way to distinguish them) 
  client.select((process.env.NODE_ENV || 'development').length);
}

var router = express.Router();

// Create a route for the cities path
router.route('/')
  .get(function(req, res) {
    client.hkeys('cities', function(err, names) {
      if(err) throw err;

      res.json(names); // use json instead of "send" to force into json format
    });	
  })

// Create a route for new city creation
  .post(urlEncode, function(req, res) {
    var newCity = req.body; // uses the body-parser middleware
    if (!newCity.name || !newCity.description) { // validate the new city name and description
      res.sendStatus(400);
      return false;
    }
    client.hset('cities', newCity.name, newCity.description, function(err) {
      if(err) throw err;
      res.status(201).json(newCity.name); // 201 = The request has been fulfilled and has resulted in 
    });					  // one or more new resources being created
  });		                      	

// Create a route for city deletion
router.route('/:name')
  .delete(function(req, res) {
    client.hdel('cities', req.params.name, function(err) {
      if (err) throw err;
      res.sendStatus(204); // 204 = The server has successfully fulfilled the request and that there is 
    });			   // no additional content to send in the response payload body
  })

// Create a route for viewing city information (using templates)
  .get(function(req, res) {
    client.hget('cities', req.params.name, function(err, description) {
      res.render('show.ejs', { city: { name: req.params.name, description: description }
      });	         // where show.ejs is the template and the city object is the data we              
    });	                 // want to pass through to the template
  });

module.exports = router;

