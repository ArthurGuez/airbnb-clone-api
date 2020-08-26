const express = require('express');

const placesController = require('../controllers/places');
const citiesController = require('../controllers/cities');
const authMid = require('../utils/jwt.utils');

const NotFoundError = require('../helpers/errors/not_found_error');
const ForbiddenError = require('../helpers/errors/forbidden_error');
const BadRequestError = require('../helpers/errors/bad_request_error');
const { OK, CREATED, NO_CONTENT } = require('../helpers/status_codes');

const router = express.Router();

router.get('/places', async (req, res) => {
  if (req.query.city) {
    const cityFound = await citiesController.getCityByName(req.query.city);
    if (!cityFound) {
      return res.status(OK).json([]);
    }
    const placesFound = await placesController.getPlacesByCity(cityFound.id);
    const alteredPlacesFound = placesFound.map((placeFound) => {
      const alteredPlaceFound = {};

      alteredPlaceFound.id = placeFound.id;
      alteredPlaceFound.city = placeFound.City.name;
      alteredPlaceFound.name = placeFound.name;
      alteredPlaceFound.description = placeFound.description;
      alteredPlaceFound.rooms = placeFound.rooms;
      alteredPlaceFound.bathrooms = placeFound.bathrooms;
      alteredPlaceFound.max_guests = placeFound.max_guests;
      alteredPlaceFound.price_by_night = placeFound.price_by_night;
      alteredPlaceFound.image = placeFound.image;

      return alteredPlaceFound;
    });
    return res.status(OK).json(alteredPlacesFound);
  }

  const placesFound = await placesController.getPlaces();
  const alteredPlacesFound = placesFound.map((placeFound) => {
    const alteredPlaceFound = {};

    alteredPlaceFound.id = placeFound.id;
    alteredPlaceFound.city = placeFound.City.name;
    alteredPlaceFound.name = placeFound.name;
    alteredPlaceFound.description = placeFound.description;
    alteredPlaceFound.rooms = placeFound.rooms;
    alteredPlaceFound.bathrooms = placeFound.bathrooms;
    alteredPlaceFound.max_guests = placeFound.max_guests;
    alteredPlaceFound.price_by_night = placeFound.price_by_night;
    alteredPlaceFound.image = placeFound.image;

    return alteredPlaceFound;
  });
  return res.status(OK).json(alteredPlacesFound);
});

router.get('/places/:placeId', async (req, res) => {
  const placeFound = await placesController.getPlaceById(req.params.placeId);
  if (!placeFound) {
    throw new NotFoundError();
  }

  return res.status(OK).json({
    id: placeFound.id,
    city: placeFound.City.name,
    name: placeFound.name,
    description: placeFound.description,
    rooms: placeFound.rooms,
    bathrooms: placeFound.bathrooms,
    max_guests: placeFound.max_guests,
    price_by_night: placeFound.price_by_night,
    image: placeFound.image,
  });
});

router.post('/places', authMid.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;
  const { description, rooms } = req.body;
  if (userRole === 'tourist') {
    throw new ForbiddenError();
  }
  if (description === null || description === undefined || description === '') {
    throw new BadRequestError('Requête incorrecte', "Le champ description n'est pas renseigné");
  }

  if (typeof rooms !== 'number') {
    throw new BadRequestError('Requête incorrecte', 'Le champ rooms doit être un nombre entier');
  }
  const newPlace = await placesController.addPlace(req.body);
  const cityFound = await citiesController.getCityById(req.body.city_id);

  return res.status(CREATED).json({
    id: newPlace.id,
    city: cityFound.name,
    name: newPlace.name,
    description: newPlace.description,
    rooms: newPlace.rooms,
    bathrooms: newPlace.bathrooms,
    max_guests: newPlace.max_guests,
    price_by_night: newPlace.price_by_night,
  });
});

router.patch('/places/:placeId', authMid.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;
  const { rooms } = req.body;

  if (userRole === 'tourist') {
    throw new ForbiddenError();
  }

  if (req.body.title) {
    throw new BadRequestError('Requête incorrecte', "Le champ title n'existe pas");
  }

  if (typeof rooms !== 'number') {
    throw new BadRequestError('Requête incorrecte', 'Le champ rooms doit être un nombre entier');
  }

  const placeUpdated = await placesController.updatePlace(req.body, req.params.placeId);

  if (!placeUpdated) {
    throw new NotFoundError();
  }

  return res.status(OK).json({
    id: placeUpdated.id,
    city: placeUpdated.City.name,
    name: placeUpdated.name,
    description: placeUpdated.description,
    rooms: placeUpdated.rooms,
    bathrooms: placeUpdated.bathrooms,
    max_guests: placeUpdated.max_guests,
    price_by_night: placeUpdated.price_by_night,
  });
});

router.delete('/places/:placeId', authMid.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;

  if (userRole === 'tourist') {
    throw new ForbiddenError();
  }

  const placeDeleted = await placesController.deletePlace(req.params.placeId);

  if (!placeDeleted) {
    throw new NotFoundError();
  }

  return res.status(NO_CONTENT).send();
});

module.exports = router;
