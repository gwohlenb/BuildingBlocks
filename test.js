var request = require('supertest');
var app = require('./app');

// A simple supertest/mocha test wrapper (describe-it)
describe('Requests to the root path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
    .get('/')
    .expect(200)
    .end(function(err) {
       if (err) throw err;
       done();
    });
  })

  it('Returns an HTML format', function(done) {
    request(app)
    .get('/')
    .expect('Content-Type', /html/, done) // check for HTML via a regex
  })

  it('Returns an index file with cities', function(done) {
    request(app)
    .get('/')
    .expect(/cities/i, done) // check for generic Cities index file
  })
})

describe('Listing cities on /cities', function() {
  it ('Returns 200 status code', function(done) {
    request(app)
    .get('/cities')
    .expect(200, done); // done is being used as a shortcut here; equivalent to .end function above
  })

  it ('Returns JSON format', function(done) {
    request(app)
    .get('/cities')
    .expect('Content-Type', /json/, done) // check for json via a regex
  })

  it ('Returns initial cities', function(done) {
    request(app)
    .get('/cities')
    .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done)
  })
})
