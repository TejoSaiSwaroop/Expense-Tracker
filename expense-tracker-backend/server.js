const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/auth', require('./routes/api/authRoutes')); // Separate auth route
app.use('/api/expenses', require('./routes/api/expenseRoutes'));

// Define a simple route for the root URL
app.get('/', (req, res) => res.send('API is running'));

// Define a catch-all route for undefined routes
app.use((req, res) => res.status(404).send('Route not found'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));