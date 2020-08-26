const express = require('express');
const validate = require('uuid-validate');

const authMid = require('../utils/jwt.utils');
const bookingsController = require('../controllers/bookings');
const NotFoundError = require('../helpers/errors/not_found_error');
const ForbiddenError = require('../helpers/errors/forbidden_error');
const BadRequestError = require('../helpers/errors/bad_request_error');

const router = express.Router();

router.post('/bookings', authMid.authenticateJWT, async (req, res) => {
  const { userRole, userId } = req.user;
  console.log(req.user);

  if (userRole === 'host') {
    throw new ForbiddenError();
  }

  const { place_id: placeId, check_in: checkIn, check_out: checkOut } = req.body;

  // 400 - Le champ place_id n'est pas renseigné
  if (placeId === null || placeId === undefined || placeId === '') {
    throw new BadRequestError('Requête incorrecte', "Le champ place_id n'est pas renseigné");
  }

  // 400 - Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC
  if (Date.parse(checkIn).toString() === 'NaN') {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC'
    );
  }

  const checkInParsed = new Date(Date.parse(checkIn));

  if (
    checkInParsed.toISOString() !== checkIn ||
    checkInParsed.toUTCString() !== new Date(checkIn).toUTCString()
  ) {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ check_in doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC'
    );
  }

  // 400 - Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC
  if (Date.parse(checkOut).toString() === 'NaN') {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC'
    );
  }

  const checkOutParsed = new Date(Date.parse(checkOut));

  if (
    checkOutParsed.toISOString() !== checkOut ||
    checkOutParsed.toUTCString() !== new Date(checkOut).toUTCString()
  ) {
    throw new BadRequestError(
      'Requête incorrecte',
      'Le champ check_out doit être une chaîne de caractère correspondant à une date au format ISO 8601 sur le fuseau horaire UTC'
    );
  }

  // 201 - La requête est un succès (nouvelle donnée créée en base)
  const newBooking = await bookingsController.addBooking(req.body, userId);

  return res.status(201).json(newBooking);
});

router.delete('/bookings/:id', authMid.authenticateJWT, async (req, res) => {
  const { id } = req.params;

  // 404 - Si la ressource demandée n'a pas été trouvée
  // Check type d'id n'est pas UUID
  if (!validate(id)) {
    throw new NotFoundError();
  }

  const bookingFound = await bookingsController.getBookingById(id);

  if (!bookingFound) {
    throw new NotFoundError();
  }

  // 204 - Si la requête est un succès (suppression de la donnée en base)
  await bookingsController.deleteBooking(id);
  return res.status(204).json();
});

router.get('/bookings/', authMid.authenticateJWT, async (req, res) => {
  // GET /api/bookings?place_id={placeId}
  if (req.query.place_id !== undefined) {
    const bookingsFound = await bookingsController.getBookingsByPlace(req.query.place_id);

    res.status(200).json(bookingsFound);
  } else {
    const { userRole } = req.user;

    if (userRole === 'tourist') {
      // GET /api/bookings ETQ tourist
      const bookingsFound = await bookingsController.getBookingsTourist(req);

      res.status(200).json(bookingsFound);
    }

    if (userRole === 'host') {
      // GET /api/bookings ETQ host
      const bookingsFound = await bookingsController.getBookingsHost(req);

      res.status(200).json(bookingsFound);
    }
  }
});

module.exports = router;
