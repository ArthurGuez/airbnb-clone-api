const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Booking, User, Place, City } = db;

module.exports = {
  addBooking: async (data, userId) => {
    const { place_id: placeId, check_in: checkIn, check_out: checkOut } = data;

    const newBooking = await Booking.create({
      id: uuidv4(),
      place_id: placeId,
      user_id: userId,
      check_in: checkIn,
      check_out: checkOut,
    });

    const confirmedBooking = Booking.findByPk(newBooking.id, {
      attributes: ['id', 'check_in', 'check_out'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
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
    });

    return confirmedBooking;
  },

  getBookingsTourist: async (request) => {
    const { userId } = request.user;
    return Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
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
      order: [['check_in', 'DESC']],
    });
  },

  getBookingById: (bookingId) => {
    return Booking.findByPk(bookingId);
  },

  deleteBooking: (bookingId) => {
    return Booking.destroy({
      where: {
        id: bookingId,
      },
    });
  },

  getBookingsByPlace: (placeId) => {
    return Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        place_id: placeId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
      ],
      order: [['id', 'ASC']],
    });
  },

  getBookingsHost: (request) => {
    const { userId } = request.user;
    return Place.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'rooms',
        'bathrooms',
        'max_guests',
        'price_by_night',
      ],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: City,
          attributes: ['name'],
        },
        {
          model: Booking,
          attributes: ['id', 'check_in', 'check_out'],
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name', 'email'],
            },
          ],
        },
      ],
    });
  },
};
