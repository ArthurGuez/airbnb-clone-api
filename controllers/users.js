const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const { role, first_name: firstName, last_name: lastName, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      id: uuidv4(),
      role,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });
  },

  checkEmail: (email) => {
    return User.findOne({
      attributes: ['email'],
      where: {
        email: email,
      },
    });
  },

  getUserByEmail: (email) => {
    return User.findOne({
      where: {
        email: email,
      },
    });
  },

  checkPassword: (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
  },
};
