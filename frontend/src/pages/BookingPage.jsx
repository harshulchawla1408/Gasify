import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { auth } from '../firebase/auth';

const BookingPage = () => {
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [address, setAddress] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get('/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(res.data);
    } catch (error) {
      console.error('Failed to load notices:', error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post(
        '/bookings',
        { paymentMode, address },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Booking successful!');
      setAddress('');
      setPaymentMode('Cash');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Book Your Gas Cylinder</h1>
          <p className="text-gray-600 mt-1">Quick and easy gas cylinder booking</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="card">
            <h3 className="card-title">Book Gas Cylinder</h3>
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
                <select
                  id="paymentMode"
                  name="paymentMode"
                  className="form-input"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Paytm">Paytm</option>
                </select>
              </div>

              {paymentMode === 'Paytm' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium mb-3">Scan the QR to pay:</p>
                  <img 
                    src="/paytm-qr.jpg" 
                    alt="Paytm QR" 
                    className="max-w-[200px] mx-auto rounded-lg shadow-md" 
                  />
                </div>
              )}

              {paymentMode === 'UPI' && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    Send UPI payment to: <strong>7814272742@ptsbi</strong>
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="address" className="form-label">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-input resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete delivery address"
                  rows={4}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Book Now'
                )}
              </button>
            </form>
          </div>

          {/* Agency Notices */}
          <div className="card">
            <h3 className="card-title">Agency Notices</h3>
            {notices.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📢</div>
                <p className="text-gray-500">No notices available at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div 
                    key={notice._id} 
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <h4 className="font-medium text-blue-900 mb-2">{notice.title}</h4>
                    <p className="text-blue-800 text-sm">{notice.content}</p>
                    <p className="text-blue-600 text-xs mt-2">
                      Posted on: {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Booking Tips */}
        <div className="mt-8 card">
          <h3 className="card-title">Booking Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⏰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Delivery</h4>
              <p className="text-gray-600 text-sm">We deliver within 24 hours of booking confirmation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600 text-sm">Multiple payment options for your convenience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Track Status</h4>
              <p className="text-gray-600 text-sm">Monitor your booking status in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
