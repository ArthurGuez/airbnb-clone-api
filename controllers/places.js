const db = require('../models');

const { Place, City } = db;

module.exports = {
  addPlace: (data) => {
    const {
      city_id: cityId,
      user_id: userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    } = data;

    return Place.create({
      city_id: cityId,
      user_id: userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    });
  },

  updatePlace: () => {},

  getPlaceById: (placeId) => {
    return Place.findByPk(placeId);
  },

  getAllPlaces: () => {
    return Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
  },
};
