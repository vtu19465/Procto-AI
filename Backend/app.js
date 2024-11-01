const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
// Routes
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
