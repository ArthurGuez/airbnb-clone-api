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

  updatePlace: async (data, placeId) => {
    const {
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    } = data;

    const placeFound = await Place.findByPk(placeId);

    return Place.update({
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    });
  },

  getPlaceById: (placeId) => {
    return Place.findByPk(placeId, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
  },

  getAllPlaces: () => {
    return Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
      attributes: [
        'id',
        'name',
        'description',
        'rooms',
        'bathrooms',
        'max_guests',
        'price_by_night',
      ],
    });
  },
};
