const express = require('express');

const placesController = require('../controllers/places');
const citiesController = require('../controllers/cities');

const router = express.Router();

router.post('/places', async (req, res) => {
  const newPlace = await placesController.addPlace(req.body);
  const cityFound = await citiesController.getCityById(req.body.city_id);
  res.status(201).json({
    data: {
      id: newPlace.id,
      city: cityFound.name,
      name: newPlace.name,
      description: newPlace.description,
      rooms: newPlace.rooms,
      bathrooms: newPlace.bathrooms,
      max_guests: newPlace.max_guests,
      price_by_night: newPlace.price_by_night,
    },
  });
});

module.exports = router;
