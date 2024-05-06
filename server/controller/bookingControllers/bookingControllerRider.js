const express = require('express');
const router = express.Router();
const Booking = require('../../model/bookingCustomer');

// Route to get all incoming booking requests
const bookings =  async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'pending' }).populate('rider customer');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to accept a booking request
const acceptBookingById =  async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to reject a booking request
const rejectBookingById =  async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to communicate with customer regarding trip details
const CustCommuniation =  async (req, res) => {
  try {
    // Implement communication logic with customer here
    res.json({ message: 'Communication sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {bookings,acceptBookingById,rejectBookingById,CustCommuniation};
