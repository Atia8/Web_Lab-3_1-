const express = require('express');
const router = express.Router();
const { scheduleWorkout } = require('../controllers/scheduleController');

router.post('/', scheduleWorkout);

module.exports = router;
