const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Place } = db;

module.exports = {
  addPlace: async (data) => {
    const {
      city_id: cityId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    } = data;

    const newPlace = await Place.create({
      id: uuidv4(),
      city_id: cityId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    });
    return newPlace;
  },
};
