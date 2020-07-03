const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'Uy3vwHpweXYj5I-JHeEIbZ4SLAgmVHDdSGc5QFTNTBi0-u-C0';

module.exports = {
  genToken: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userRole: userData.role,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },

  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },

  getUserRole: (authorization) => {
    const token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) {
          return jwtToken.userRole;
        }
      } catch (err) {}
    }
  },
};
