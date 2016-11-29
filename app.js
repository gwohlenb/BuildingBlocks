var express = require('express')
var app = express();

// This works but the version below it does not
app.use(express.static(__dirname + '/public'));  // Mount the static middleware, passing in the
						 // folder where our static files are located

// Doesn't work because apparently it needs to be told where the public directory is located
//app.use(express.static('public')); // Mount the static middleware, passing in the folder
                                     // where our static files are located

var cities = require('./routes/cities');
app.use('/cities', cities); 


module.exports = app;
