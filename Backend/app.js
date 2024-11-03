const express = require('express');
require('dotenv').config(); 
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes'); 
const userRoutes = require('./routes/userRoutes');
const submissionRoutes = require('./routes/submissionRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes); // Authentication routes
app.use('/api', assessmentRoutes); // Assessment-related routes
app.use('/api', userRoutes);
app.use('/api', submissionRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
