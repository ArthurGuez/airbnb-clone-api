const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Booking } = db;

module.exports = {
  addBooking: async (data) => {
    const { place_id: placeId, check_in: checkIn, check_out: checkOut } = data;

    const newBooking = await Booking.create({
      id: uuidv4(),
      place_id: placeId,
      check_in: checkIn,
      check_out: checkOut,
    });
    return newBooking;
  },
};
