"use strict";

var express = require('express');

var auth = require('../middleware/auth');

var router = express.Router();

var _require = require('../controller/bikeController/bikeController'),
    getBikes = _require.getBikes,
    addBike = _require.addBike; // Route to fetch all bikes


router.get('/bikeList', getBikes); // Route to add a new bike
// router.post('/',auth, addBike);

router.post('/', addBike);
module.exports = router;