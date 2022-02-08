"use strict";

var chai = require("chai");

var chaiHttp = require("chai-http");

var config = require("config");

var should = chai.should(); //to be used to test private routes

var token;

var mongoose = require("mongoose"); //During the test the env variable is set to test


process.env.NODE_ENV = 'test';

var _require = require("../models/Article"),
    Article = _require.Article;

var _require2 = require("../models/Query"),
    Query = _require2.Query;

var _require3 = require("../models/User"),
    User = _require3.User; //Require the dev-dependencies


var server = require('../index');

chai.use(chaiHttp); //Our parent block

describe('API', function () {
  beforeEach(function (done) {
    //Before each test we empty the database
    User.deleteMany({}, function (err) {
      //  console.log(config.get("DBHOST"))
      done();
    });
  });
  afterEach(function (done) {
    // console.log(token);
    done();
  });
  describe("Login And Register", function () {
    it('should Register user, login user, generate a token upon login', function (done) {
      chai.request(server) // register request
      .post('/signup') // send user registration details
      .send({
        'username': 'Ronaldo Chris',
        'password': 'Testertester'
      }).end(function (err, res) {
        // when we get a resonse from the endpoint
        // the res object should have a status of 201
        res.should.have.status(201); // follow up with login

        chai.request(server).post('/login') // send user login details
        .send({
          'username': 'Ronaldo Chris',
          'password': 'Testertester'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('token');
          token = res.body.token;
          done();
        });
      });
    });
  });
  describe("Article", function () {
    describe("/GET articles", function () {
      it(' should get all articles ', function (done) {
        chai.request(server).get('/article').set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });
    describe("/POST articles", function () {
      it(' should POST an article ', function (done) {
        var query = {
          "heading": "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
          "content": "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
          "image": "This is a message from a good friend of yours"
        };
        chai.request(server).post('/article').send(query).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('Message').eql('New Article Created');
          done();
        });
      });
    });
  });
  describe("Query", function () {
    describe("/GET queries", function () {
      it(' should get queries ', function (done) {
        chai.request(server).get('/queries').set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('subject');
          res.body[0].should.have.property('message');
          done();
        });
      });
    });
    describe("/POST queries", function () {
      it(' should POST a query ', function (done) {
        var query = {
          "username": "Cook Indomie",
          "email": "cook@gmail.com",
          "subject": "This is a subject",
          "message": "This is a message from a good friend of yours"
        };
        chai.request(server).post('/queries').send(query).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('Message').eql('New Query submitted successfully');
          done();
        });
      });
    });
  });
  describe("Likes", function () {
    describe('/GET Like', function () {
      it(' should GET all the likes', function (done) {
        chai.request(server).get('/like').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });
  });
  describe("Comment", function () {
    describe('/GET comment', function () {
      it(' should GET all the comments', function (done) {
        chai.request(server).get('/comment').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });
  }); //Test the /POST route
}); // describe("The first test",() =>{
//   it("Should Pass",() =>{
//       expect(true).to.equal(false);
//   })
// })
//# sourceMappingURL=index.test.js.map