const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/signup', async (req, res) => {
  const newUser = await usersController.addUser(req.body);
  console.log(req.body)
  res.status(201).json({
    data: {
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    },
  });
});

module.exports = router;
