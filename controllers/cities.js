const db = require('../models');

const { City } = db;

module.exports = {
  getCities: async () => {
    const citiesFound = await City.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
    });
    return citiesFound;
  },
};
