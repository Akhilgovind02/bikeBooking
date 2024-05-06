const express = require('express');
// const auth = require('../middleware/auth')
const router = express.Router();
const {availabileBikes,custBooking} = require('../controller/bookingControllerCust/bookingControllerCust');

// Route to fetch all bikes

// Route to add a new bike
router.get('/available',availabileBikes)
router.post('/bookings', custBooking);

module.exports = router;
