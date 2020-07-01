const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const User = db.User;

module.exports = {
  addUser: async (data) => {
    const { role, first_name, last_name, email, password } = data;
    const newUser = await User.create(
      {
        id: uuidv4(),
        role,
        first_name,
        last_name,
        email,
        password,
      },
      { attributes: ['role', 'first_name', 'last_name', 'email'] }
    );
    return newUser;
  },
};
