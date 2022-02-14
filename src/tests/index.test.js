
const chai = require("chai");
const chaiHttp = require("chai-http")
const config = require("config")
let should = chai.should();

//to be used to test private routes
let token,articleId;

const mongoose = require("mongoose");

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { Article } = require("../models/Article");
const { Query } = require("../models/Query");
const { User } = require("../models/User");

//Require the dev-dependencies
let server = require('../index');


chai.use(chaiHttp);

//Our parent block
describe('API', () => {

    beforeEach((done) => { //Before each test we empty the database
        User.deleteMany({},(err)=>{
         //  console.log(config.get("DBHost"))
            done();
        });
    });

    afterEach((done)=>{
       // console.log(token);
        done();
    })
 
    describe("Login And Register",()=>{

        it('should Register user, login user, generate a token upon login', function(done) {
            chai.request(server)

                // register request
                .post('/signup')
                // send user registration details
                .send({
                        'email': 'Ronaldomessi@gmail.com',
                        'password': 'Testertester',
                    }
                ) 
                .end((err, res) => { // when we get a response from the endpoint
                     //console.log(res.body)
                    // the res object should have a status of 201
                    res.should.have.status(201);

                    // follow up with login
                    chai.request(server)
                        .post('/login')
                        // send user login details
                        .send({
                            'email': 'Ronaldomessi@gmail.com',
                            'password': 'Testertester'
                        })
                        .end((err, res) => {
                             res.should.have.status(200);
                             res.body.should.have.property('token');
                             token = res.body.token;
                            done();
                        })
                })
        })

        it('should not accept short password', function(done) {
            chai.request(server)
                // register request
                .post('/signup')
                // send user registration details
                .send({
                    'email': 'Ronaldomessi@gmail.com',
                    'password': 'tet',
                    }
                ) 
                .end((err, res) => { // when we get a resonse from the endpoint
                    res.should.have.status(400);
                    done()
                })
        })

        it("Should not allow invalid credentials",function (done) {
            chai.request(server)
            .post('/login')
            // send user login details
            .send({
                'username': 'Ronalsdfdo Chris',
                'password': 'sdfjlsdf'
            })
            .end((err, res) => {
                 res.should.have.status(400);
                 res.body.should.have.property('Message');
                done();
            })
        })
   })

   describe("Article",()=>{

        describe("/GET articles",()=>{
            it(' should get all articles ', (done) => {

                chai.request(server)
                    .get('/article')
                    .set('Authorization', 'JWT ' + token) //token is actual token data
                    .end(function(err, res) {
                        articleId = res.body[0]["_id"];
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].should.have.property('_id');
                        res.body.length.should.not.be.eql(0);
                        done();
                    });
            })

            it(' should get a particular article article', (done) => {
                chai.request(server)
                    .get('/article/' + articleId)
                    .set('Authorization', 'JWT ' + token) //token is actual token data
                    .end(function(err, res) {
                        res.should.have.status(200);
                        done();
                    });
            })
        })

        describe("/POST articles",() =>{
            it(' should POST an article ', (done) => {
                let query ={
                    "heading": "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
                    "content":"I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
                    "image":"This is a message from a good friend of yours" 
                }
        
              chai.request(server)
                  .post('/article')
                  .send(query)
                  .set('Authorization', 'JWT ' + token) //token is actual token data
                  .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('Message').eql('New Article Created');
                    done();
                  });
            });
         })
   })

   describe("Query",()=>{
    describe("/GET queries",()=>{
        it(' should get queries ', (done) => {

            chai.request(server)
                .get('/query')
                .set('Authorization', 'JWT ' + token) 
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('email');
                    res.body[0].should.have.property('subject');
                    res.body[0].should.have.property('message');
                    done();
                });
        })
    })

    describe("/POST query",() =>{
        it(' should POST a query ', (done) => {
            let query ={
                "username": "Cook Indomie",
                "email": "cook@gmail.com",
                "subject":"This is a subject",
                "message":"This is a message from a good friend of yours"
            }
    
          chai.request(server)
              .post('/query')
              .send(query)
              .set('Authorization', 'JWT ' + token) //token is actual token data
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Message').eql('New Query submitted successfully');
                done();
              });
        });
     })
   })

   describe("Likes",()=>{
       let likeId;
  
        describe("/POST like",() =>{
            it(' should POST a like ', (done) => {
                let like ={
                    "articleId": articleId
                }
        
              chai.request(server)
                  .post('/like')
                  .send(like)
                  .set('Authorization', 'JWT ' + token) //token is actual token data
                  .end((err, res) => {
                    res.body.should.have.property('Message');
                    done();
                  });
            });
         })
         
         describe('/GET Like', () => {
            it(' should GET all the likes', (done) => {
            chai.request(server)
                .get('/like')
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.not.be.eql(0);
                        likeId = res.body[0]["_id"];
                    done();
                });
            });
        });
         describe('/GET like/:id', () => {

            it(' should GET a particular like', (done) => {
              chai.request(server)
                  .get('/like/' + likeId)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    done();
                  });
            });
        });

  })
  describe("Comment",()=>{
let commentId;
  describe('/GET comment', () => {
      it(' should GET all the comments', (done) => {
        chai.request(server)
            .get('/comment')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
                  commentId = res.body[0]["_id"];
              done();
            });
      });
  });


  describe("/POST comment",() =>{
    it(' should POST a comment ', (done) => {
        let comment ={
            "articleId": articleId,
            "comment" : "This is a test added during testing"
        }

      chai.request(server)
          .post('/comment')
          .send(comment)
          .set('Authorization', 'JWT ' + token) //token is actual token data
          .end((err, res) => {
                res.should.have.status(201);
            done();
          });
    });
 })

 describe('/GET comment/:id', () => {

    it(' should GET a particular comment', (done) => {
      chai.request(server)
          .get('/comment/' + commentId)
          .set('Authorization', 'JWT ' + token) //token is actual token data
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
});


  })

});

// describe("The first test",() =>{
//   it("Should Pass",() =>{
//       expect(true).to.equal(false);
//   })

// })