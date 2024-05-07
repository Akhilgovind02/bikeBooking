"use strict";

var Bike = require('../../model/bike');

var LuggageOption = require('../../model/luggage');

var getBikes = function getBikes(req, res) {
  var availableBikes;
  return regeneratorRuntime.async(function getBikes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Bike.find({
            available: true
          }).populate('luggageOptions'));

        case 3:
          availableBikes = _context.sent;
          res.json(availableBikes);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching bikes:', _context.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getBikeById = function getBikeById(req, res) {
  var bikeId, bike;
  return regeneratorRuntime.async(function getBikeById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          bikeId = req.params.bikeId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Bike.findById(bikeId).populate('luggageOptions'));

        case 4:
          bike = _context2.sent;

          if (bike) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: 'Bike not found'
          }));

        case 7:
          res.json(bike);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching bike by ID:', _context2.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var addBike = function addBike(req, res) {
  var _req$body, name, type, price, image, luggageOptions, newBike;

  return regeneratorRuntime.async(function addBike$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, name = _req$body.name, type = _req$body.type, price = _req$body.price, image = _req$body.image, luggageOptions = _req$body.luggageOptions;
          console.log('Luggage options received:', luggageOptions);
          newBike = new Bike({
            name: name,
            type: type,
            price: price,
            image: image,
            luggageOptions: luggageOptions
          });
          _context3.next = 6;
          return regeneratorRuntime.awrap(newBike.save());

        case 6:
          res.json({
            message: 'Bike added successfully'
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error('Error adding bike:', _context3.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getBikes: getBikes,
  addBike: addBike,
  getBikeById: getBikeById
};