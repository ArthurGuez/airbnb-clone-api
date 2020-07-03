const express = require('express');

const placesController = require('../controllers/places');
const citiesController = require('../controllers/cities');
const jwtUtils = require('../utils/jwt.utils');

const router = express.Router();

router.post('/places', async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userRole = await jwtUtils.getUserRole(headerAuth);
  const { description, rooms } = req.body;

  if (userRole === 'host') {
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
  } else if (userRole === 'tourist') {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  } else {
    return res.status(401).json({
      message: 'Vous devez être connecté pour accéder à cette ressource',
    });
  }
});

module.exports = router;
