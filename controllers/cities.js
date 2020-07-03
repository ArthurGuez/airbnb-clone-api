const db = require('../models');

const { City } = db;

module.exports = {
  getCities: () => {
    return City.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
    });
  },

  getCityById: (id) => {
    return City.findByPk(id, {
      attributes: ['name'],
    });
  },
};
