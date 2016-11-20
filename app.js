var express = require('express')
var app = express();

// Create a route for the root path
app.get('/', function(req, res) {
  res.send('OK');	
});

module.exports = app;
