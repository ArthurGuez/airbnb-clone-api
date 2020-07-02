const express = require('express');

const citiesController = require('../controllers/cities');

const router = express.Router();

router.get('/cities', async (req, res) => {
  const citiesFound = await citiesController.getCities();
  res.status(201).json(citiesFound);
});

module.exports = router;
