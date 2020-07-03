const express = require('express');

const bookingsController = require('../controllers/bookings');

const router = express.Router();

router.post('/bookings', async (req, res) => {
  const newBooking = await bookingsController.addBooking(req.body);

  res.status(201).json({
    data: {
      id: newBooking.id,
      place_id: newBooking.place_id,
      check_in: newBooking.check_in,
      check_out: newBooking.check_out,
    },
  });
});

module.exports = router;
