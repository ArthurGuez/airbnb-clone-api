const { v4: uuidv4 } = require('uuid');

module.exports = () => {
  return [
    {
      id: '93c2edcc-341b-42f0-92a2-e10e1e239bcd',
      role: 'host',
      first_name: 'Sylvie',
      last_name: 'Lu',
      email: 'host@test.com',
      password: '$2b$10$b7.UoLIcuxmaBn8NPjZSJOVe4ciOpx64SOGkquJOAAKvsbZpIDEA6',
    },
    {
      id: uuidv4(),
      role: 'tourist',
      first_name: 'My',
      last_name: 'Vo',
      email: 'tourist@test.com',
      password: '$2b$10$b7.UoLIcuxmaBn8NPjZSJOVe4ciOpx64SOGkquJOAAKvsbZpIDEA6',
    },
  ];
};
