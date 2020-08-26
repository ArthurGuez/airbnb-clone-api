const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
const placesRouter = require('./places');
const citiesRouter = require('./cities');
const bookingsRouter = require('./bookings');

const { OK } = require('../helpers/status_codes');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
router.use(placesRouter);
router.use(citiesRouter);
router.use(bookingsRouter);

router.get('/', (req, res) => {
  res.status(OK).json({ message: 'Hello World!' });
});

module.exports = router;
