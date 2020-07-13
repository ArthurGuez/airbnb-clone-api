const { v4: uuidv4 } = require('uuid');

module.exports = async () => {
  return [
    {
      id: uuidv4(),
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
