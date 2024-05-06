"use strict";

var mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  responded: {
    type: Boolean,
    "default": false
  },
  response: {
    type: String
  }
}, {
  timestamps: true
});
var Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;