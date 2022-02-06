
const chai = require("chai");
const chaiHttp = require("chai-http")
const config = require("config")
let should = chai.should();

//to be used to test private routes
let token;

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
            //  console.log(config.get("DBHOST"))
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
                        'username': 'Ronaldo Chris',
                        'password': 'Testertester',
                    }
                ) 
                .end((err, res) => { // when we get a resonse from the endpoint

                    // the res object should have a status of 201
                    res.should.have.status(201);

                    // follow up with login
                    chai.request(server)
                        .post('/login')
                        // send user login details
                        .send({
                            'username': 'Ronaldo Chris',
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
   })

   describe("Article",()=>{

        describe("/GET articles",()=>{
            it(' should get all articles ', (done) => {

                chai.request(server)
                    .get('/article')
                    .set('Authorization', 'JWT ' + token) //token is actual token data
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
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
                .get('/queries')
                .set('Authorization', 'JWT ' + token) //token is actual token data
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

    describe("/POST queries",() =>{
        it(' should POST a query ', (done) => {
            let query ={
                "username": "Cook Indomie",
                "email": "cook@gmail.com",
                "subject":"This is a subject",
                "message":"This is a message from a good friend of yours"
                
            }
    
          chai.request(server)
              .post('/queries')
              .send(query)
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
        describe('/GET Like', () => {
            it(' should GET all the likes', (done) => {
            chai.request(server)
                .get('/like')
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    done();
                });
            });
        });
  
  })
  describe("Comment",()=>{
  describe('/GET comment', () => {
      it(' should GET all the comments', (done) => {
        chai.request(server)
            .get('/comment')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  })



//Test the /POST route
 


});

// describe("The first test",() =>{
//   it("Should Pass",() =>{
//       expect(true).to.equal(false);
//   })

// })