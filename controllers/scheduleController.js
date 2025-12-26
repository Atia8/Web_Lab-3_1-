const Workout = require('../models/workoutModel');
const User = require('../models/userModel');
const Trainer = require('../models/trainerModel');

exports.scheduleWorkout = async (req, res) => {
  try {
    const { userId, trainerId, scheduledDate, workoutType, duration, notes } = req.body;

    // 1. Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!['premium', 'elite'].includes(user.membershipType)) {
      return res.status(403).json({ error: 'User membership not valid for scheduling' });
    }

    // 2. Validate trainer
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    if (!trainer.available) return res.status(400).json({ error: 'Trainer not available' });

    // 3. Check conflicts
    const conflictingTrainer = await Workout.findOne({
      trainer: trainerId,
      scheduledDate,
      status: 'scheduled'
    });
    if (conflictingTrainer) return res.status(400).json({ error: 'Trainer has a conflicting workout' });

    const conflictingUser = await Workout.findOne({
      user: userId,
      scheduledDate,
      status: 'scheduled'
    });
    if (conflictingUser) return res.status(400).json({ error: 'User has a conflicting workout' });

    // 4. Create workout
    const workout = await Workout.create({
      title: `${workoutType} Session`,
      workoutType,
      duration,
      scheduledDate,
      status: 'scheduled',
      notes,
      user: userId,
      trainer: trainerId
    });

    res.status(201).json({ message: 'Workout scheduled successfully', workout });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
