const { v4: uuidv4 } = require('uuid');

module.exports = () => {
  return [
    {
      id: uuidv4(),
      role: 'host',
      first_name: 'Sylvie',
      last_name: 'Lu',
      email: 'sylvie@lu.com',
      password: 'azerty',
    },
    {
      id: uuidv4(),
      role: 'tourist',
      first_name: 'My',
      last_name: 'Vo',
      email: 'my@vo.com',
      password: 'azerty',
    },
  ];
};
