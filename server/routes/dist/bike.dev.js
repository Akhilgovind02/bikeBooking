"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = express.Router();

var _require = require('../controller/bikeController/bikeController'),
    getBikes = _require.getBikes,
    getBikeById = _require.getBikeById,
    addBike = _require.addBike; // Route to fetch all bikes


router.get('/bikeList', getBikes);
router.get('/bike/:id'); // Route to add a new bike
// router.post('/',auth, addBike);

router.post('/', addBike);
module.exports = router;