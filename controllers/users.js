const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const { role, first_name: firstName, last_name: lastName, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        id: uuidv4(),
        role,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      { attributes: ['role', 'first_name', 'last_name', 'email'] }
    );
    return newUser;
  },

  searchByEmail: async (email) => {
    const userFound = await User.findOne({
      attributes: ['email'],
      where: {
        email: email,
      },
    });
    return userFound;
  },
};
