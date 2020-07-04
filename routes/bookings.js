const express = require('express');

const authMid = require('../utils/jwt.utils');
const bookingsController = require('../controllers/bookings');

const router = express.Router();

router.post('/bookings', authMid.authenticateJWT, async (req, res) => {
  const { place_id: placeId, check_in: checkIn, check_out: checkOut } = req.body;

  // 400 - Le champ place_id n'est pas renseigné
  if (placeId === null || placeId === undefined || placeId === '') {
    return res.status(400).json({
      error: "Le champ place_id n'est pas renseigné",
    });
  }

  // 400 - Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC
  if (Date.parse(checkIn).toString() === 'NaN') {
    return res.status(400).json({
      error:
        'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

  const checkInParsed = new Date(Date.parse(checkIn));

  if (
    checkInParsed.toISOString() !== checkIn ||
    checkInParsed.toUTCString() !== new Date(checkIn).toUTCString()
  ) {
    return res.status(400).json({
      error:
        'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

  // 400 - Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC
  if (Date.parse(checkOut).toString() === 'NaN') {
    return res.status(400).json({
      error:
        'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

  const checkOutParsed = new Date(Date.parse(checkOut));

  if (
    checkOutParsed.toISOString() !== checkOut ||
    checkOutParsed.toUTCString() !== new Date(checkOut).toUTCString()
  ) {
    return res.status(400).json({
      error:
        'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

  // 201 - La requête est un succès (nouvelle donnée créée en base)
  const newBooking = await bookingsController.addBooking(req.body);

  res.status(201).json({
    data: {
      id: newBooking.id,
      place_id: newBooking.place_id,
      check_in: newBooking.check_in,
      check_out: newBooking.check_out,
    },
  });
});

module.exports = router;
