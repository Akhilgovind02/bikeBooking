const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackForRider, respondToFeedback } = require('../controller/feedbackController/feedbackController');
// const {createFeedback,getFeedbackByRiderId} = require('../controller/custFeedback/custFeedback')

// Route to create feedback
router.post('/feedback', createFeedback);

// Route to get feedback for a rider
router.get('/feedback/:riderId', getFeedbackForRider);

// Route to respond to feedback
router.put('/feedback/:id/respond', respondToFeedback);

module.exports = router;
