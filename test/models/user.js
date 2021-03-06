import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import User from '../../app/models/User';
import '../../sema.io.js';

chai.use(chaiHttp);
// Change to test db
process.env.MONGO_URL = 'mongodb://localhost/sema-test';

describe("User model ", function () {
  beforeEach(done=>{
    User.remove({}, error=>{
      done();
    });
  });


  it("should return users", done =>{
    done();
  });

  it("should add a user", done =>{
   done();
  });

  it("user with email and password has no socialId", done =>{
    done();
  });

  it("user with socialId has no password", done =>{
    done();
  });
});
