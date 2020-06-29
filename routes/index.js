const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', (req, res) => {
//   const data = await indexController.getIndex;
  res.status(200).json({ message: 'Hello World!' });
});

router.get('*', (req, res) => {
    res.status(404).json({
        error: 'Vous vous êtes trompés !'
    });
});

module.exports = router;