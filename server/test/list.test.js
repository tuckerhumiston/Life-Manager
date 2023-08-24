//Test cases for list item routes
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

//Chai config
chai.use(chaiHttp);
chai.should();


describe("List Tests", async () => {

  let agent = chai.request.agent(app); // Use agent to maintain session

  //Set up user environment before tests
  before((done) => {
    const payload = {
        "email": "admintest02@email.com",
        "username": "admintest02",
        "password": "@dmintest"
      };
  
      chai
        .request(app)
        .post('/profile/register')
        .send(payload)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.should.have.status(201);
            res.body.success.should.equal(true);
            done();
          }
        });
    });

    it('it should login user', (done) => {
        const payload = {
          "email": "admintest02@email.com",
          "password": "@dmintest"
        };
        agent
          .post('/profile/login')
          .send(payload)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
          });
      });

  describe('List Functions', () => {
    it('it should create a new list item', (done) => {
        const payload = {
            "title": "Test List",
            "list": "todo"
        }
        agent
            .post('/feature/item')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should break on creating a new item with invalid list type', (done) => {
        const payload = {
            "title": "Test List",
            "list": "newlist"
        }
        agent
            .post('/feature/item')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('it should get the items in a single specified list', (done) => {
        agent
            .get('/feature/item')
            .query({
                "list": "todo"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    //Test Update if implemented...
    it('it should delete a list item', (done) => {
        const payload = {
            "description": "Test List",
            "list": "todo"
        }
        agent
            .delete('/feature/item')
            .query(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    //Close user environment after tests
    after((done) => {
        agent
            .delete('/profile/delete-user')
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.success.should.equal(true);
                    done();
                }
            });
    });

});

});
