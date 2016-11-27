var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();

// Select the test database version (as opposed to 'development')
// (length is just a quick and dirty way to distinguish them)
client.select('test'.length); // database 4
client.flushdb(); // Flush the database to start clean

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
    .expect('Content-Type', /html/, done); // check for HTML via a regex
  })

  it('Returns an index file with cities', function(done) {
    request(app)
    .get('/')
    .expect(/cities/i, done); // check for generic Cities index file
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
    .expect('Content-Type', /json/, done); // check for json via a regex
  })

  it ('Returns initial cities', function(done) {
    request(app)
    .get('/cities')
    .expect(JSON.stringify([]), done);
  })
})

describe('Creating new cities', function() {

  it ('Returns a 201 status code', function(done) {
    request(app)
    .post('/cities')
    .send('name=Springfield&description=where+the+simpsons+live')
    .expect(201, done);
  })

  it ('Returns the city name', function(done) {
    request(app)
    .post('/cities')
    .send('name=Springfield&description=where+the+simpsons+live')
    .expect(/springfield/i, done);
  })
})

describe('Deleting cities', function() {

  before(function() {
    client.hset('cities', 'Banana', 'a tasty fruit');
  });

  after(function() {
    client.flushdb();
  });

  it ('Returns a 204 status code', function(done) {
    request(app)
    .delete('/cities/Banana')
    .expect(204)
    .end(function(err) {
       if (err) throw err;
       done();
  });
})
 

