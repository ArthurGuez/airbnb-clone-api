const db = require('../models');

const { Place } = db;

module.exports = {
  addPlace: async (data) => {
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

    const newPlace = await Place.create({
      city_id: cityId,
      user_id: userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    });
    return newPlace;
  },

  getPlaceById: async (placeId) => {
    const placeFound = await Place.findByPk(placeId);
    return placeFound;
  },
};
