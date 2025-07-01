import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending', // Options: Pending, Approved, Rejected
  },
  paymentMode: {
    type: String,
    default: 'Cash', // Options: Cash, Paytm, UPI, etc.
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;