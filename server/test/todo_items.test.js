const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

//Chai config
chai.use(chaiHttp);
chai.should();

//Test cases for todo list item routes