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
