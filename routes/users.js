const express = require('express');

const usersController = require('../controllers/users');
const jwtUtils = require('../utils/jwt.utils');

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

  const userFound = await usersController.checkEmail(email);
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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const userFound = await usersController.getUserByEmail(email);

  if (userFound) {
    console.log('userFound.password : ', userFound.password);
    console.log('password : ', password);

    const userIdentified = await usersController.checkPassword(password, userFound.password);
    if (userIdentified) {
      res.status(200).json({
        token: jwtUtils.genToken(userIdentified),
        user: {
          role: userIdentified.role,
          first_name: userIdentified.first_name,
          last_name: userIdentified.last_name,
          email: userIdentified.email,
        },
      });
    } else {
      return res.status(401).json({
        error: "Votre mot de passe n'est pas correct",
      });
    }
  } else {
    return res.status(401).json({
      error: "Votre compte n'existe pas",
    });
  }
});

module.exports = router;
