//Test cases for list item routes
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

//Chai config
chai.use(chaiHttp);
chai.should();



describe('Quote Controller', () => {

    let agent = chai.request.agent(app); // Use agent to maintain session

    //Set up user environment before tests
    before((done) => {
        const payload = {
            "email": "admintest03@email.com",
            "username": "admintest03",
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

    it('it should login the user', (done) => {
        const payload = {
          "email": "admintest03@email.com",
          "password": "@dmintest"
        }
        agent
          .post('/profile/login')
          .send(payload)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
        });
      });

    it('should get a random quote', (done) => {
        agent
            .get('/quote/new') 
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('tags');
                res.body.should.have.property('content');
                res.body.should.have.property('author');
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