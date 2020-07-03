const Faker = require('../seeds');

module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.bulkInsert('Users', Faker.createFixtureRoutes('users'), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
