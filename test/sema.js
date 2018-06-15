const app = require("../sema.io.js");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const baseUrl = "http://localhost:5000";

process.env.NODE_ENV = 'test';
process.env.PORT = 5555;

chai.use(chaiHttp);

describe("Sema.io Test Suites", function () {
  this.timeout(1000);

  describe("Basic routes exists", function () {
    it("/ page exists", function (done) {
      chai.request(baseUrl).get('/').end((error, res) =>{
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
});