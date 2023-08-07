//Test cases for todo list item routes
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

//Chai config
chai.use(chaiHttp);
chai.should();

//Test cases for user profile routes
describe("Todo List Tests", async () => {

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

  describe('Todo List Functions', () => {
    let listId;
    it('it should create a new todo list', (done) => {
        const payload = {
            "title": "Test Todo List"
        }
        agent
            .post('/api/list')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.equal(true);
                listId = res.list_id;
                done();
            });
        
    });
    it('it should get all todo lists', (done) => {
        agent
            .get('/api/lists')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should get a single specified todo list', (done) => {
        agent
            .get('/api/list')
            .send({id: listId})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should update a todo list', (done) => {
        const payload = {
            "id": listId,
            "title": "Updated Todo List"
        }
        agent
            .put('/api/list')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should delete a todo list', (done) => {
        const payload = {
            "id": listId
        }
        agent
            .delete('/api/list')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
  });

  describe('Todo List Items', () => {
    let itemId;
    let listId;
    //Create list to add items to
    before((done) => {
        const payload = {
            "title": "Test Todo List"
        }
        agent
            .post('/api/list')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.equal(true);
                listId = res.list_id;
                done();
            });
    
        });

    it('it should create a new todo item', (done) => {
        const payload = {
            "title": "Test Todo Item",
            "list_id": 1
        }
        agent
            .post('/api/item')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.equal(true);
                itemId = res.item_id;
                done();
            });
        
    });
    it('it should get all of the user\'s todo items', (done) => {
        agent
            .get('/api/items')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should get all of the todo items for a specified list', (done) => {
        agent
            .get('/api/list-items')
            .send({id: listId})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should update a todo item', (done) => {
        const payload = {
            "id": itemId,
            "title": "Updated Todo Item",
            "completed": true
        }
        agent
            .put('/api/item')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
    it('it should delete a todo item', (done) => {
        const payload = {
            "id": itemId
        }
        agent
            .delete('/api/item')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.equal(true);
                done();
            });
    });
  })


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


