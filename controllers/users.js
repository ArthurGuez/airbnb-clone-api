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

  getUserById: (userId) => {
    return User.findByPK(userId);
  },

  checkEmail: (userEmail) => {
    return User.findOne({
      attributes: ['email'],
      where: {
        email: userEmail,
      },
    });
  },

  getUserByEmail: (userEmail) => {
    return User.findOne({
      where: {
        email: userEmail,
      },
    });
  },

  checkPassword: (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
  },
};
