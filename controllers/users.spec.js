const { expect } = require('chai');
const sinon = require('sinon');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const usersController = require('./users');
const db = require('../models');

const { User } = db;

describe('Controllers :: UsersController :: Unit', () => {
  describe('#addUser', () => {
    it('should execute hash password method', async () => {
      //Given
      const data = {
        password: 'azerty',
      };

      const createStub = sinon.stub(bcrypt, 'hash');

      //When
      await usersController.addUser(data);

      //Then
      expect(createStub.calledOnce).to.be.true;
    });

    it('should execute create method', async () => {
      //Given
      const data = {
        role: 'tourist',
        first_name: 'Laurent',
        last_name: 'Jade',
        email: 'laurent@jade.fr',
        password: 'azerty',
      };

      const createStub = sinon.stub(User, 'create');

      //When
      await usersController.addUser(data);

      //Then
      expect(createStub.calledOnce).to.be.true;

      // expect(createStub.calledOnceWithExactly).
    });
  });
});

describe('Controllers :: UsersController :: Integration', () => {
  describe('#addUser', () => {
    it('it should return the right object', async () => {
      //Given
      const data = {
        role: 'tourist',
        first_name: 'Laurent',
        last_name: 'Jade',
        email: 'laurent@jade.fr',
        password: 'azerty',
      };

      //When
      const newUser = await usersController.addUser(data);
      console.log(newUser)
      //Then
      expect(newUser).to.have.property('id');
      expect(newUser).to.have.property('role');
      expect(newUser.role).to.equal(data.role);
      expect(newUser).to.have.property('first_name');
      expect(newUser.first_name).to.equal(data.first_name);
      expect(newUser).to.have.property('last_name');
      expect(newUser.last_name).to.equal(data.last_name);
      expect(newUser).to.have.property('email');
      expect(newUser.email).to.equal(data.email);
      expect(newUser).to.have.property('password');
      expect(newUser.password).to.equal(data.password);
    });
  });
});
