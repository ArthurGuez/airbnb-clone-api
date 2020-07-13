const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Booking, Place, City } = db;

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

  getBookings: async (request) => {
    const { userId } = request.user;
    const bookingsFound = await Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Place,
          attributes: [
            'id',
            'name',
            'description',
            'rooms',
            'bathrooms',
            'max_guests',
            'price_by_night',
          ],
          include: [
            {
              model: City,
              attributes: ['name'],
            },
          ],
        },
      ],
      raw: true,
      order: [['check_in', 'DESC']],
    });

    return bookingsFound;
  },
};
