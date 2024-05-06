const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const {getBikes, addBike} = require('../controller/bikeController/bikeController');

// Route to fetch all bikes
router.get('/bikeList',getBikes);

// Route to add a new bike
// router.post('/',auth, addBike);
router.post('/', addBike);


module.exports = router;
