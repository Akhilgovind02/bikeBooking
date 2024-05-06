const express = require('express');
const router = express.Router();
const Feedback = require('../../model/Feedback');

// Create feedback
const createFeedback =  async (req, res) => {
  try {
    const { riderId, customerId, rating, comment } = req.body;
    const feedback = new Feedback({ rider: riderId, customer: customerId, rating, comment });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get feedback for a rider
const getFeedbackForRider = async (req, res) => {
  try {
    const { riderId } = req.params;
    const feedback = await Feedback.find({ rider: riderId }).populate('customer');
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Respond to feedback
const respondToFeedback =  async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(id, { responded: true, response }, { new: true });
    res.json({ success: true, message: 'Feedback response updated successfully', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {createFeedback,getFeedbackForRider,respondToFeedback};
