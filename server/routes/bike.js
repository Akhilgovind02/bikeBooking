const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const {getBikes, getBikeById,addBike} = require('../controller/bikeController/bikeController');

// Route to fetch all bikes
router.get('/bikeList',getBikes);
router.get('/bike/:id')

// Route to add a new bike
// router.post('/',auth, addBike);
router.post('/', addBike);


module.exports = router;
