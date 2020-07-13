const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const hashPassword = () => {
  const hashedPassword = bcrypt.hash('azerty', 10);
  return hashedPassword;
};
module.exports = async () => {
  return [
    {
      id: uuidv4(),
      role: 'host',
      first_name: 'Sylvie',
      last_name: 'Lu',
      email: 'host@test.com',
      password: await hashPassword(),
    },
    {
      id: uuidv4(),
      role: 'tourist',
      first_name: 'My',
      last_name: 'Vo',
      email: 'tourist@test.com',
      password: await hashPassword(),
    },
  ];
};
