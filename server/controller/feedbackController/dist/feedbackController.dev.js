"use strict";

var express = require('express');

var router = express.Router();

var Feedback = require('../../model/Feedback'); // Create feedback


var createFeedback = function createFeedback(req, res) {
  var _req$body, riderId, customerId, rating, comment, feedback;

  return regeneratorRuntime.async(function createFeedback$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, riderId = _req$body.riderId, customerId = _req$body.customerId, rating = _req$body.rating, comment = _req$body.comment;
          feedback = new Feedback({
            rider: riderId,
            customer: customerId,
            rating: rating,
            comment: comment
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(feedback.save());

        case 5:
          res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully'
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get feedback for a rider


var getFeedbackForRider = function getFeedbackForRider(req, res) {
  var riderId, feedback;
  return regeneratorRuntime.async(function getFeedbackForRider$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          riderId = req.params.riderId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Feedback.find({
            rider: riderId
          }).populate('customer'));

        case 4:
          feedback = _context2.sent;
          res.json(feedback);
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Respond to feedback


var respondToFeedback = function respondToFeedback(req, res) {
  var id, response, feedback;
  return regeneratorRuntime.async(function respondToFeedback$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          response = req.body.response;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Feedback.findByIdAndUpdate(id, {
            responded: true,
            response: response
          }, {
            "new": true
          }));

        case 5:
          feedback = _context3.sent;
          res.json({
            success: true,
            message: 'Feedback response updated successfully',
            feedback: feedback
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            success: false,
            message: 'Server error'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  createFeedback: createFeedback,
  getFeedbackForRider: getFeedbackForRider,
  respondToFeedback: respondToFeedback
};