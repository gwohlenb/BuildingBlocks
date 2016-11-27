var express = require('express')
var app = express();

var bodyParser = require('body-parser')
var urlEncode = bodyParser.urlencoded({extended: false});

// This works but the version below it does not
app.use(express.static(__dirname + '/public'));  // Mount the static middleware, passing in the
						 // folder where our static files are located

// Doesn't work because apparently it needs to be told where the public directory is located
//app.use(express.static('public')); // Mount the static middleware, passing in the folder
                                     // where our static files are located

// Object to hold the cities and their descriptions
var cities = {
	'Lotopia': 'a happy place',
	'Caspiana': 'a brave place',
	'Indigo': 'a blue place'
};

// Create a route for the cities path
app.get('/cities', function(req, res) {
   res.json(Object.keys(cities)); // use json instead of "send" to force into json format	
});

// Create a route for new city creation
app.post('/cities', urlEncode, function(req, res) {
  var newCity = req.body; // uses the body-parser middleware
  cities[newCity.name] = newCity.description;
  res.status(201).json(newCity.name); // 201 = The request has been fulfilled and has resulted in one or more
});		                      // new resources being created	

module.exports = app;
