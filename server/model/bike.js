const mongoose = require('mongoose');

const luggageOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  available: { type: Boolean, default: true },
  luggageOptions: [luggageOptionSchema] // Array of luggage objects
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
