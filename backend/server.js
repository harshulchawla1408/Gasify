// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import bookingRoutes from './Routes/bookingRoutes.js';
import noticeRoutes from './Routes/noticeRoutes.js';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/user', userRoutes); // ✅ For storing user info

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {}) 
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
    process.exit(1);
  });
