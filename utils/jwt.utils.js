const jwt = require('jsonwebtoken');
const ForbiddenError = require('../helpers/errors/forbidden_error');
const UnauthorizedError = require('../helpers/errors/unauthorized_error');

const secret = process.env.JWT_SIGN_SECRET;

module.exports = {
  genToken: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userRole: userData.role,
      },
      secret
      /* {
        expiresIn: '1h',
      } */
    );
  },

  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secret, (err, user) => {
        if (err) {
          throw new ForbiddenError();
        }

        req.user = user;

        next();
      });
    } else {
      throw new UnauthorizedError(
        'Accès refusé',
        'Vous devez être connecté pour accéder à cette ressource'
      );
    }
  },
};
