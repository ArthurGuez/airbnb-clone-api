const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'Uy3vwHpweXYj5I-JHeEIbZ4SLAgmVHDdSGc5QFTNTBi0-u-C0';

module.exports = {
  genToken: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },

  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        error: 'Vous devez être connecté pour accéder à cette ressource',
      });
    }
  },
};
