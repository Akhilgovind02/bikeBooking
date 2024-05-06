"use strict";

var express = require('express'); // const auth = require('../middleware/auth')


var router = express.Router();

var _require = require('../controller/bookingControllers/bookingControllerRider'),
    bookings = _require.bookings,
    acceptBookingById = _require.acceptBookingById,
    rejectBookingById = _require.rejectBookingById,
    CustCommuniation = _require.CustCommuniation; // Route to fetch all bikes
// Route to add a new bike


router.get('/', bookings);
router.put('/:id/accept', acceptBookingById);
router.put('/:id/reject', rejectBookingById);
router.post('/chat', CustCommuniation);
module.exports = router;