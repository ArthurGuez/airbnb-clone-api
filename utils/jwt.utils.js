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
};
