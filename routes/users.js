const express = require('express');

const usersController = require('../controllers/users');
const jwtUtils = require('../utils/jwt.utils');
const UnauthorizedError = require('../helpers/errors/unauthorized_error');
const BadRequestError = require('../helpers/errors/bad_request_error');
const ConflictError = require('../helpers/errors/conflict_error');
const { OK, CREATED } = require('../helpers/status_codes');

const router = express.Router();

router.get('/me', jwtUtils.authenticateJWT, async (req, res) => {
  const { userId } = req.user;

  const userFound = await usersController.getUserById(userId);

  if (userFound) {
    res.status(OK).json({
      user: {
        role: userFound.role,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email,
      },
    });
  } else {
    throw new UnauthorizedError('Accès refusé', "Nous n'avons pas réussi à vous identifier");
  }
});

router.post('/signup', async (req, res) => {
  const { first_name: firstName, email } = req.body;

  if (firstName === null || firstName === undefined || firstName === '') {
    throw new BadRequestError('Requête incorrecte', "Le champ first_name n'est pas renseigné");
  }

  if (typeof firstName !== 'string') {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ first_name doit être une chaîne de caractères'
    );
  }

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    res.status(CREATED).json({
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    });
  } else {
    throw new ConflictError(
      'Conflit',
      'Un utilisateur utilisant cette adresse email est déjà enregistré'
    );
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const userFound = await usersController.getUserByEmail(email);

  if (userFound) {
    const isIdentified = await usersController.checkPassword(password, userFound.password);
    if (isIdentified) {
      res.status(OK).json({
        token: jwtUtils.genToken(userFound),
        user: {
          role: userFound.role,
          first_name: userFound.first_name,
          last_name: userFound.last_name,
          email: userFound.email,
        },
      });
    } else {
      throw new UnauthorizedError('Accès refusé', "Votre mot de passe n'est pas correct");
    }
  } else {
    throw new UnauthorizedError('Accès refusé', "Votre compte n'existe pas");
  }
});

module.exports = router;
