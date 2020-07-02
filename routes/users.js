const express = require('express');
const _ = require('lodash');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { first_name: firstName, email } = req.body;

  if (firstName === null || firstName === undefined || firstName === '') {
    return res.status(400).json({
      error: "Le champ first_name n'est pas renseigné",
    });
  }

  if (typeof firstName !== 'string') {
    return res.status(400).json({
      error: 'Le champ first_name doit être une chaîne de caractères',
    });
  }

  const userFound = await usersController.searchByEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    res.status(201).json({
      data: {
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } else {
    return res.status(409).json({
      error: 'Un utilisateur utilisant cette adresse email est déjà enregistré',
    });
  }
});

// router.post('/login', async (req, res) => {});

module.exports = router;
