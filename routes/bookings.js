const express = require('express');

const bookingsController = require('../controllers/bookings');

const router = express.Router();

router.post('/bookings', async (req, res) => {
  const { place_id: placeId, check_in: checkIn } = req.body;

  if (placeId === null || placeId === undefined || placeId === '') {
    return res.status(400).json({
      error: "Le champ place_id n'est pas renseigné",
    });
  }

  if (Date.parse(checkIn).toString() === 'NaN') {
    return res.status(400).json({
      error:
        'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

  const dateParsed = new Date(Date.parse(checkIn));

  // https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
  if (
    dateParsed.toISOString() !== checkIn ||
    dateParsed.toUTCString() !== new Date(checkIn).toUTCString()
  ) {
    return res.status(400).json({
      error:
        'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC',
    });
  }

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
