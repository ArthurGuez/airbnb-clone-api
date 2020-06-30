const uuid = require('uuid/v4');

const db = require('../models');

const User = db.User;

module.exports = {
  addUser: async (data) => {
    const { role, first_name, last_name, email, password } = data;
    const newUser = await User.create(
      {
        id: uuid(),
        role,
        first_name,
        last_name,
        email,
        password,
      },
      { attributes: ['id', 'role', 'first_name', 'last_name', 'email', 'password'] }
    );
    return newUser;
  },
};
