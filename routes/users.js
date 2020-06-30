const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/signup', async (req, res) => {
  const newUser = await usersController.addUser({ role, first_name, last_name, email, password });
  res.status(201).json({
    data: {
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    },
  });
});
