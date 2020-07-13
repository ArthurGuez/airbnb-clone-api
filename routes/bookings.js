const express = require('express');
const validate = require('uuid-validate');

const authMid = require('../utils/jwt.utils');
const bookingsController = require('../controllers/bookings');

const router = express.Router();

router.post('/bookings', authMid.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;

  if (userRole === 'host') {
    return res.status(403).json({
      error: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

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
  const newBooking = await bookingsController.addBooking(req);

  res.status(201).json(newBooking);
});

router.get('/bookings', authMid.authenticateJWT, async (req, res) => {
  const bookingsFound = await bookingsController.getBookings(req);
  res.status(201).json(bookingsFound);
});

router.delete('/bookings/:id', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.params;

  // 404 - Si la ressource demandée n'a pas été trouvée
  // Check type d'id n'est pas UUID
  if (!validate(id)) {
    return res.status(404).json({
      error: "La ressource demandée n'existe pas",
    });
  }

  const bookingFound = await bookingsController.rechercherBookingId(id);

  if (!bookingFound) {
    return res.status(404).json({
      error: "La ressource demandée n'existe pas",
    });
  }

  // 204 - Si la requête est un succès (suppression de la donnée en base)
  await bookingsController.deleteBooking(id);
  res.status(204).json();
});

module.exports = router;
