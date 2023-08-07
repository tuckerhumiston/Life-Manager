const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

//Chai config
chai.use(chaiHttp);
chai.should();

//Test cases for user profile routes
describe("User profile tests", () => {

  let agent = chai.request.agent(app); // Use agent to maintain session

  it('it should create user', (done) => {
    const payload = {
      "email": "admintest@email.com",
      "username": "admintest",
      "password": "@dmintest"
    }
    chai
      .request(app)
      .post('/profile/register')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('it should login user', (done) => {
    const payload = {
      "email": "admintest@email.com",
      "password": "@dmintest"
    }
    agent
      // .request(app)
      .post('/profile/login')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
    });
  });

  it('it should logout user', (done) => {
    agent
      // .request(app)
      .get('/profile/logout')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
        
    });
  });

  it('it should log user back in', (done) => {
    const payload = {
      "email": "admintest@email.com",
      "password": "@dmintest"
    }
    agent
      // .request(app)
      .post('/profile/login')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
    });
  });

  it('it should delete user', (done) => {
    const payload = {
      "email": "admintest@email.com",
      "password": "@dmintest"
    }
    agent
      .delete('/profile/delete-user')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        done();
      });
  });
});