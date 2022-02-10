
const chai = require("chai");
const chaiHttp = require("chai-http")
let should = chai.should();

//to be used to test private routes
let token;

const mongoose = require("mongoose");

const { Article } = require("../models/Post");
const { Query } = require("../collection/contact");
const { User } = require("../models/User");

//Require the dev-dependencies
let server = require('../index');

chai.use(chaiHttp);

//Our parent block
describe('API', () => {
 
    describe("Login ",()=>{

        it('Should be able to generate a token', function(done) {
            chai.request(server)

                // register request
                .post('/login')
                .send({
                    'username': 'Nzagaruka John',
                    'password': 'Nzagaruka'
                })
                .end((err, res) => { // when we get a response from the endpoint
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    token = res.body.token;
                    done()
                })
        })
   })

   describe("Post",()=>{

        describe("/GET Posts",()=>{
            it(' should get all Posts ', (done) => {

                chai.request(server)
                    .get('api/posts')
                    .set('Authorization', 'JWT ' + token) //token is actual token data
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            })
        })

        describe("/POST posts",() =>{
            it(' should POST a post ', (done) => {
                let query ={
                    "title": "title are the things i like",
                    "content":"the only issue I have with this is that the application code should never be changed to fit a test"                }
        
              chai.request(server)
                  .post('/api/posts')
                  .send(query)
                  .set('Authorization', 'JWT ' + token) //token is actual token data
                  .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                    done();
                  });
            });
         })
   })

   describe("Query",()=>{
    describe("/GET queries",()=>{
        it(' should get queries ', (done) => {

            chai.request(server)
                .get('/querry')
                .set('Authorization', 'JWT ' + token) 
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    })

    describe("/POST query",() =>{
        it(' should POST a query ', (done) => {
            let query ={
                "name": "Barry Elen",
                "email": "theflash@gmail.com",
                "message":"I am the fastest man alive"
            }
    
          chai.request(server)
              .post('/querry')
              .send(query)
              .set('Authorization', 'JWT ' + token) //token is actual token data
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                done();
              });
        });
     })
   })
});

