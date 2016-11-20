var request = require('supertest');
var app = require('./app);

// A simple test case
describe('Requests to the root path'. function() { // mocha block
	it('Returns a 200 status code'), function(done) {
	  request(app)
	    .get('/')
	    .expect(200)
	    .end(function(error) {
	 	  if (error) throw error;
		    done();
	  });
	});
});
