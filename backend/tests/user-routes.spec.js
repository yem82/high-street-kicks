import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';
import mongoose from 'mongoose';
import { newUserA, newUserB, newUserC, newUserD,
  newUserD2, newUserD3, newUserD4,
  newUserE, newUserE2, newUserF, newUserG } from './helpers.spec.js';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/testCollection'
chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  before( async () => {
    try {
      await mongoose.connect(MONGO_URL,
      { useNewUrlParser: true , useCreateIndex: true }, () => {
        console.log('You have connected with MongoDB database')
      })
    } catch (error) {
        console.log(error);
    }
  })

  after( async () => {
    await mongoose.connection.collections.users.drop(() => {
      console.log('Test database dropped');
    })
    await mongoose.connection.close();
  })

  describe("POST /users", () => {
    describe("sign-up", () => {
      context('when credentials are valid', () => {
        it("should add a new user", async () => {
         const result = await chai
            .request(app)
            .post('/users/register')
            .send(newUserA)
            console.log(newUserA)
          expect(result).to.have.status(201)
          expect(result.body).to.include({message: 'User added!'})
        })

        it("should add a new user", async () => {
          const result = await chai
            .request(app)
            .post('/users/register')
            .send(newUserB)
            console.log(newUserB)
          expect(result.status).to.be.equal(201)
          expect(result.body).to.include({message: 'User added!'})
        })
      })

      context('when credentials are invalid', () => {
        context('when required fields are left empty', () => {
          let user = {};
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(user)
            expect(result.status).to.be.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when name is not provided', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserC)
            expect(result.status).to.be.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when email is not provided', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserD)
            expect(result.status).to.be.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when email is already in use', () => {
          before(async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserD2)
            expect(result.status).to.equal(201);
          })

          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserD2)
            expect(result.status).to.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when email does not contain a \'@\'', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserD3)
            expect(result.status).to.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when email does not contain a \'.\'', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserD4)
            expect(result.status).to.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when password is not provided', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserE)
            expect(result.status).to.be.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when passwords do not match', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserE2)
            expect(result.status).to.be.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when address is not provided', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserF)
            expect(result.status).to.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })

        context('when phone number is not provided', () => {
          it("should not add a new user", async () => {
            const result = await chai
              .request(app)
              .post('/users/register')
              .send(newUserG)
            expect(result.status).to.equal(422);
            expect(result.body).to.not.include('User added!')
          })
        })
      })
    })
  })

  describe("GET /users", () => {
    it("should get all users", async () => {
      const result = await chai
        .request(app)
        .get('/users')
      expect(result.status).to.equal(201);
    })
  })
});