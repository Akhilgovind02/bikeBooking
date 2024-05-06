"use strict";

var express = require('express');

var router = express.Router();

var Bike = require('../../model/bike');

var BikeBooking = require('../../model/bookingCustomer');

var _require = require('express-validator'),
    validationResult = _require.validationResult; // Route to search for available bikes based on location, date, and preferences


var availabileBikes = function availabileBikes(req, res) {
  var _req$query, location, date, preferences, availableBikes;

  return regeneratorRuntime.async(function availabileBikes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Implement logic to search for available bikes based on location, date, and preferences
          // For example:
          _req$query = req.query, location = _req$query.location, date = _req$query.date, preferences = _req$query.preferences;
          _context.next = 4;
          return regeneratorRuntime.awrap(Bike.find({
            location: location,
            available: true
          }));

        case 4:
          availableBikes = _context.sent;
          // Filter available bikes based on other criteria if needed
          res.json(availableBikes);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Route to book a bike


var custBooking = function custBooking(req, res) {
  var errors, _req$body, customerId, bikeId, pickupLocation, tripDate, tripDuration, booking;

  return regeneratorRuntime.async(function custBooking$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Validate request body
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 4:
          // Create a new bike booking
          _req$body = req.body, customerId = _req$body.customerId, bikeId = _req$body.bikeId, pickupLocation = _req$body.pickupLocation, tripDate = _req$body.tripDate, tripDuration = _req$body.tripDuration;
          booking = new BikeBooking({
            customer: customerId,
            bike: bikeId,
            pickupLocation: pickupLocation,
            tripDate: tripDate,
            tripDuration: tripDuration
          });
          _context2.next = 8;
          return regeneratorRuntime.awrap(booking.save());

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Bike.findByIdAndUpdate(bikeId, {
            available: false
          }));

        case 10:
          res.status(201).json({
            message: 'Bike booked successfully',
            booking: booking
          });
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = {
  availabileBikes: availabileBikes,
  custBooking: custBooking
};