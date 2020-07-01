const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const { role, first_name: firstName, last_name: lastName, email, password } = data;
    const newUser = await User.create(
      {
        id: uuidv4(),
        role,
        firstName,
        lastName,
        email,
        password,
      },
      { attributes: ['role', 'first_name', 'last_name', 'email'] }
    );
    return newUser;
  },

  searchByEmail: async (email) => {
    await User.findOne({
      attributes: ['email'],
      where: {
        email: email,
      },
    });
  },
};
