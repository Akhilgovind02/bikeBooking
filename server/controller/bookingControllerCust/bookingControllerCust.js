const express = require('express');
const router = express.Router();
const Bike = require('../../model/bike');
const BikeBooking = require('../../model/bookingCustomer');
const { validationResult } = require('express-validator');

// Route to search for available bikes based on location, date, and preferences
const availabileBikes  =  async (req, res) => {
  try {
    // Implement logic to search for available bikes based on location, date, and preferences
    // For example:
    const { location, date, preferences } = req.query;
    const availableBikes = await Bike.find({ location, available: true });
    // Filter available bikes based on other criteria if needed
    res.json(availableBikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to book a bike
    const custBooking =  async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new bike booking
    const { customerId, bikeId, pickupLocation, tripDate, tripDuration } = req.body;
    const booking = new BikeBooking({
      customer: customerId,
      bike: bikeId,
      pickupLocation,
      tripDate,
      tripDuration
    });
    await booking.save();

    // Update bike availability status
    await Bike.findByIdAndUpdate(bikeId, { available: false });

    res.status(201).json({ message: 'Bike booked successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {availabileBikes,custBooking};
