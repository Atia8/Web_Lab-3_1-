const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutModel');

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('user trainer');
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user trainer');
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update workout
router.put('/:id', async (req, res) => {
  try {
    const { status, scheduledDate, notes } = req.body;

    // Only allow updating certain fields
    const updatedFields = {};
    if (status) updatedFields.status = status;
    if (scheduledDate) updatedFields.scheduledDate = scheduledDate;
    if (notes) updatedFields.notes = notes;

    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    ).populate('user trainer');

    if (!workout) return res.status(404).json({ error: 'Workout not found' });

    res.json(workout);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });

    res.json({ message: 'Workout deleted successfully', workout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
