const express = require('express');
// const auth = require('../middleware/auth')
const router = express.Router();
const {bookings,acceptBookingById,rejectBookingById,CustCommuniation} = require('../controller/bookingControllers/bookingControllerRider');

// Route to fetch all bikes

// Route to add a new bike
router.get('/',bookings)
router.put('/:id/accept', acceptBookingById);
router.put('/:id/reject',rejectBookingById)
router.post('/chat',CustCommuniation)

module.exports = router;
