const Trainer = require('../models/trainerModel');

// Create Trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Trainers 
exports.getTrainers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.available) filters.available = req.query.available === 'true';
    if (req.query.specialization) filters.specialization = req.query.specialization;

    const trainers = await Trainer.find(filters);
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Trainer by ID
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Trainer
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
