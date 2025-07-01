// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import bookingRoutes from './Routes/bookingRoutes.js';
import noticeRoutes from './Routes/noticeRoutes.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/user', userRoutes); 

// Base route for testing
app.get('/', (req, res) => {
  res.send('🚀 Backend server is running.');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
    process.exit(1);
  });
