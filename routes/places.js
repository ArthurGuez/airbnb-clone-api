const express = require('express');

const placesController = require('../controllers/places');

const router = express.Router();

router.post('/places', async (req, res) => {
  const newPlace = await placesController.addPlace(req.body);
  res.status(201).json({
    data: {
      id: newPlace.id,
      city: newPlace.city,
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
