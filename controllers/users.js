const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const { role, first_name: firstName, last_name: lastName, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id: uuidv4(),
      role,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });
    return newUser;
  },

  checkEmail: async (email) => {
    const userFound = await User.findOne({
      attributes: ['email'],
      where: {
        email: email,
      },
    });
    return userFound;
  },

  getUserByEmail: async (email) => {
    const userFound = await User.findOne({
      where: {
        email: email,
      },
    });
    return userFound;
  },
  checkPassword: async (password, userPassword) => {
    const passwordMatched = await bcrypt.compare(password, userFound.password);

    return passwordMatched;
  },
};
