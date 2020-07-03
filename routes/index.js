const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
const placesRouter = require('./places');
const citiesRouter = require('./cities');
const bookingsRouter = require('./bookings');

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
router.use(placesRouter);
router.use(citiesRouter);
router.use(bookingsRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Vous vous êtes trompés !',
  });
});

module.exports = router;
