"use strict";

// tripRoutes.js
var express = require('express');

var router = express.Router();

var Trip = require('../../model/trip');

var TripUpdate = require('../../model/TripUpdate'); // Create a new trip


var createTrip = function createTrip(req, res) {
  var _req$body, riderId, customerId, trip;

  return regeneratorRuntime.async(function createTrip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, riderId = _req$body.riderId, customerId = _req$body.customerId;
          trip = new Trip({
            rider: riderId,
            customer: customerId
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(trip.save());

        case 5:
          res.status(201).json(trip);
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
}; // Update trip status


var updateTripStatus = function updateTripStatus(req, res) {
  var id, status, trip;
  return regeneratorRuntime.async(function updateTripStatus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          status = req.body.status;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Trip.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": true
          }));

        case 5:
          trip = _context2.sent;
          res.json(trip);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Fetch trip history


var getTripHistory = function getTripHistory(req, res) {
  var trips;
  return regeneratorRuntime.async(function getTripHistory$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Trip.find().populate('rider customer'));

        case 3:
          trips = _context3.sent;
          res.json(trips);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Provide update during journey


var provideTripUpdate = function provideTripUpdate(req, res) {
  var id, message, update;
  return regeneratorRuntime.async(function provideTripUpdate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          message = req.body.message;
          update = new TripUpdate({
            trip: id,
            message: message
          });
          _context4.next = 6;
          return regeneratorRuntime.awrap(update.save());

        case 6:
          res.status(201).json(update);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  createTrip: createTrip,
  updateTripStatus: updateTripStatus,
  getTripHistory: getTripHistory,
  provideTripUpdate: provideTripUpdate
};