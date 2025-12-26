require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();


connectDB();


app.use(express.json());


// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));





app.get('/', (req, res) => {
  res.send('Hello, Gym Management System!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
