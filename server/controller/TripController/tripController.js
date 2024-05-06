// tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../../model/trip');
const TripUpdate = require('../../model/TripUpdate');

// Create a new trip
const createTrip =  async (req, res) => {
  try {
    const { riderId, customerId } = req.body;
    const trip = new Trip({ rider: riderId, customer: customerId });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update trip status
const updateTripStatus =  async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const trip = await Trip.findByIdAndUpdate(id, { status }, { new: true });
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch trip history
const getTripHistory =  async (req, res) => {
  try {
    const trips = await Trip.find().populate('rider customer');
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Provide update during journey
const provideTripUpdate =  async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const update = new TripUpdate({ trip: id, message });
    await update.save();
    res.status(201).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {createTrip,updateTripStatus,getTripHistory,provideTripUpdate};
