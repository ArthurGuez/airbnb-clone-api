const express = require('express');

const placesController = require('../controllers/places');
const citiesController = require('../controllers/cities');
const authMid = require('../utils/jwt.utils');

const router = express.Router();

router.get('/places', async (req, res) => {
  const placesFound = await placesController.getAllPlaces();

  res.status(200).json(placesFound);
});

router.get('/places/:placeId', async (req, res) => {
  const placeFound = await placesController.getPlaceById(req.params.placeId);
  if (placeFound) {
    res.status(200).json({
      id: placeFound.id,
      city: placeFound.City.name,
      name: placeFound.name,
      description: placeFound.description,
      rooms: placeFound.rooms,
      bathrooms: placeFound.bathrooms,
      max_guests: placeFound.max_guests,
      price_by_night: placeFound.price_by_night,
    });
  } else {
    return res.status(404).json({
      error: "La ressource demandée n'existe pas",
    });
  }
});

router.post('/places', authMid.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;
  const { description, rooms } = req.body;
  if (userRole === 'tourist') {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }
  if (description === null || description === undefined || description === '') {
    return res.status(400).json({
      message: "Le champ description n'est pas renseigné",
    });
  }

  if (typeof rooms !== 'number') {
    return res.status(400).json({
      message: 'Le champ rooms doit être un nombre entier',
    });
  }
  const newPlace = await placesController.addPlace(req.body);
  const cityFound = await citiesController.getCityById(req.body.city_id);
  res.status(201).json({
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

  if (userRole === 'tourist') {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });

    const placeUpdated = await placesController.updatePlace(req.body, req.params.id);

    res.status(200).json({
      id: placeUpdated.id,
      city: placeUpdated.city,
      name: placeUpdated.name,
      description: placeUpdated.description,
      rooms: placeUpdated.rooms,
      bathrooms: placeUpdated.bathrooms,
      max_guests: placeUpdated.max_guests,
      price_by_night: placeUpdated.price_by_night,
    });
  }
});

module.exports = router;
