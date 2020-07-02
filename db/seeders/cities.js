const Faker = require('../seeds');

module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.bulkInsert('Cities', Faker.createFixtureRoutes('cities'), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  },
};
