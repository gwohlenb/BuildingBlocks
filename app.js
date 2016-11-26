var express = require('express')
var app = express();

// This works but the version below it does not
app.use(express.static(__dirname + '/public'));  // Mount the static middleware, passing in the
						 // folder where our static files are located

// Doesn't work for some reason
//app.use(express.static('public')); // Mount the static middleware, passing in the folder
                                     // where our static files are located

// Create a route for the cities path
app.get('/cities', function(req, res) {
   var cities = ['Lotopia', 'Caspiana', 'Indigo'];
   res.json(cities); // use json instead of send to force into json format	
});

module.exports = app;
