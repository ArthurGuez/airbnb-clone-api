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

  getCityById: async (id) => {
    const cityFound = await City.findByPk(id, {
      attributes: ['name'],
    });
    return cityFound;
  },
};
