const express = require('express');

const citiesController = require('../controllers/cities');

const router = express.Router();

const { CREATED } = require('../helpers/status_codes');

router.get('/cities', async (req, res) => {
  const citiesFound = await citiesController.getCities();
  res.status(CREATED).json(citiesFound);
});

module.exports = router;
