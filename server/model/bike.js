const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  available: { type: Boolean, default: true },
  luggageOptions: [{ type:  mongoose.SchemaTypes.ObjectId, ref: 'LuggageOption' }]
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
