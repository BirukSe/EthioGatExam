const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam'); // Adjust path if necessary

// Get exams route
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error in /exams route:', error);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;
