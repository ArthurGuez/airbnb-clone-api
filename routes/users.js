const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validators = require('../middlewares/validators/users');
const wrapAsync = require('../middlewares/wrapAsync');

router.post(
  '/signup',
  wrapAsync(async (req, res, next) => {
    const { first_name } = req.body;

    validators.firstName(first_name, res);

    const newUser = await usersController.addUser(req.body);

    res.status(201).json({
      data: {
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  })
);

module.exports = router;
