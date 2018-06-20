const app = require("../app/sema.js");
const chai = require("chai");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000";

process.env.NODE_ENV = 'test';
process.env.PORT = 5000;
process.env.MONGODB_URL = 'mongodb://localhost/sema-test';

chai.use(require("chai-http")); // chai-http for making requests

describe("Sema.io Test Suites", function () {
  this.timeout(5000);

  describe("Basic routes exists", function () {
    it("/ page exists", function (done) {
      chai.request(baseUrl)
        .get('/')
        .end((error, res) =>{
        expect(error).to.be.a('null');
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/login page exists", function (done) {
      chai.request(baseUrl).get('/login').end((error, res) =>{
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/signin page exists", function (done) {
      chai.request(baseUrl).get('/signin').end((error, res) =>{
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe("User should be able to", function () {
    it("/users/signin", function (done) {
      let user = {
        email: 'johndoe@gmail.com',
        password: 'Very_secure_pass',
        username: 'johny'
      };
      chai.request(baseUrl)
        .post('/users/signin')
        .send(user)
        .end((err, res)=>{
          console.log(err)
          expect(err).to.be.a('null');
          expect(res.status).to.equal(200);
          expect(res.redirects).to.include('http://localhost:5000/login');
          done();
        });
    });

    it("/login", function (done) {
      chai.request(baseUrl)
        .post('/users/login')
        .send({ email: 'johndoe@gmail.com', password: 'Very_secure_pass'})
        .end( (err, res)=>{
          console.log(err)
          expect(err).to.be.a('null');
          expect(res.status).to.be.equal(200);
          expect(res.redirects).to.include('http://localhost:5000');
          done();
        });
    });
  });

  describe("User can login via ", function () {
    it("/auth/facebook", function (done) {
      chai.request(baseUrl)
        .get('/users/auth/facebook')
        .end((error, res)=>{
          expect(error).to.be.a('null');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it("/auth/twitter", function (done) {
      done();
    });
  });
});