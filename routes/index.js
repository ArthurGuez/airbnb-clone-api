const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');

router.use(bodyParser.json());
router.use(usersRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Vous vous êtes trompés !',
  });
});

module.exports = router;
