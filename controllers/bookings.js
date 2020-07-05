const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Booking } = db;

module.exports = {
  addBooking: async (request) => {
    const { place_id: placeId, check_in: checkIn, check_out: checkOut } = request.body;
    const { userId } = request.user;

    const newBooking = await Booking.create({
      id: uuidv4(),
      place_id: placeId,
      user_id: userId,
      check_in: checkIn,
      check_out: checkOut,
    });
    return newBooking;
  },

  getBookings: async () => {
    const bookingsFound = await Booking.findAll({
      attributes: ['id', 'place_id', 'user_id', 'check_in', 'check_out'],
      order: [['id', 'ASC']],
    });

    return bookingsFound;
  },
};
