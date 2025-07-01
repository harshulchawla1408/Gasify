import express from 'express';
import Booking from '../Models/Booking.js';
import { verifyFirebaseToken } from '../middlewares/verifyFirebaseToken.js';

const router = express.Router();

// ✅ POST - Create a new booking (no limit now)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const { paymentMode, address } = req.body;

    if (!paymentMode || !address) {
      return res.status(400).json({ error: 'Payment mode and address are required.' });
    }

    // Auto-approve if payment is not Cash
    const status = paymentMode === 'Cash' ? 'Pending' : 'Approved';

    const booking = new Booking({
      userId: req.user.uid,
      userEmail: req.user.email,
      paymentMode,
      address,
      status,
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// ✅ GET - Fetch user's own bookings
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.uid }).sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Fetch user bookings failed:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ✅ GET - Admin: fetch all bookings (no admin check)
router.get('/all', verifyFirebaseToken, async (req, res) => {
  try {
    const allBookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(allBookings);
  } catch (error) {
    console.error('Admin fetch all bookings failed:', error);
    res.status(500).json({ error: 'Failed to fetch all bookings' });
  }
});

// ✅ PATCH - Admin: approve/reject a booking (no admin check)
router.patch('/:id/status', verifyFirebaseToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Update booking status failed:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;
