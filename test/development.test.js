const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../src/index');
const User = require('../src/models/user.model');

chai.use(chaiHttp);
const expect = chai.expect;

let authToken;
let taskObj;

describe('Task Management API', () => {
    describe('User Register with Duplicate Key Test', () => {
        //Clear db before every test
        beforeEach(async () => {
            await User.findOneAndDelete({email: 'testUser@test.com'});
        });

        it('should register first and then should return 400 status for duplicate save request.', (done) => {

            chai.request(app)
                .post('/api/auth/register')
                .send({ email: 'testUser@test.com', password: 'testPassword' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    chai.request(app)
                        .post('/api/auth/register')
                        .send({ email: 'testUser@test.com', password: 'testPassword' })
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property('message').equal('Duplicate key error');
                            done();
                        });
                });
        });
    });

    describe('Login test', () => {
        it('should login and get logged in user object with authToken', (done) => {

            chai.request(app)
                .post('/api/auth/login')
                .send({ email: 'testUser@test.com', password: 'testPassword' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('authToken');
                    authToken = res.body.authToken;
                    done();
                });
        });
    });

    describe('Create new task', () => {
        it('should create new task with authToken', (done) => {
            chai.request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    "title": "Test Task Title",
                    "description": "This is the test description for Test Task",
                    "assignee": "6602c9170ac80eae0dd9cb91",
                    "completed": true
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('title').that.is.a('string');
                    taskObj = res.body;
                    done();
                });
        });
    });

    describe('Get a single task by ID', () => {
        it('should get a task by ID with authToken', (done) => {
            chai.request(app)
                .get(`/api/tasks/${taskObj._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('title').that.is.a('string');
                    done();
                });
        });
    });

    describe('Get all tasks', () => {
        it('should get all tasks with authToken', (done) => {
            chai.request(app)
                .get(`/api/tasks`)
                .set('Authorization', `Bearer ${authToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('Update task task', () => {
        it('should update users own task with authToken', (done) => {
            chai.request(app)
                .patch(`/api/tasks/${taskObj._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    "title": "Updated Title"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('title').that.is.equals("Updated Title");
                    done();
                });
        });
    });

    describe('Delete task task', () => {
        it('should delete users own task with authToken', (done) => {
            chai.request(app)
                .delete(`/api/tasks/${taskObj._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').that.is.equals("Task removed successfully.");
                    done();
                });
        });
    });
});