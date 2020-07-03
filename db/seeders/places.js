const Faker = require('../seeds');

module.exports = {
  up: (QueryInterface, Sequelize) => {
    return QueryInterface.bulkInsert('Places', Faker.createFixtureRoutes('places'), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Places', null, {});
  },
};
