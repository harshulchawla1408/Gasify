// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/auth';
import axios from '../lib/axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [notices, setNotices] = useState([]);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser(firebaseUser);
        fetchDashboardData(token);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchDashboardData = async (token) => {
    try {
      const bookingsRes = await axios.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookingsRes.data);

      const noticesRes = await axios.get('/notices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(noticesRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Please enter your address.');
      return;
    }

    try {
      const res = await axios.post('/bookings', {
        paymentMode,
        address,
        email: user.email,
      });
      alert('Booking successful!');
      setBookings((prev) => [...prev, res.data]);
      setAddress('');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Try again.');
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getMonthlyBookingData = () => {
    const dataMap = {};
    bookings.forEach(({ bookingDate }) => {
      const month = new Date(bookingDate).toLocaleString('default', { month: 'short' });
      dataMap[month] = (dataMap[month] || 0) + 1;
    });
    const labels = Object.keys(dataMap);
    const values = Object.values(dataMap);
    return { labels, values };
  };

  const getPaymentDistribution = () => {
    const dataMap = { Cash: 0, UPI: 0, Paytm: 0 };
    bookings.forEach(({ paymentMode }) => {
      dataMap[paymentMode] = (dataMap[paymentMode] || 0) + 1;
    });
    return {
      labels: Object.keys(dataMap),
      values: Object.values(dataMap),
    };
  };

  if (!user) return null;

  const monthly = getMonthlyBookingData();
  const payment = getPaymentDistribution();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gas Agency Dashboard</h1>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Welcome Card + Analytics */}
          <div className="card">
            <h2 className="card-title">Welcome, {user.email}</h2>
            <p className="text-gray-600 mb-4">This is your dashboard. Below is your booking history and agency notices.</p>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-2">Monthly Bookings</h3>
              <Bar
                data={{
                  labels: monthly.labels,
                  datasets: [{
                    label: 'Bookings',
                    data: monthly.values,
                    backgroundColor: '#10B981',
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="card">
            <h3 className="card-title">Book a Gas Cylinder</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <label htmlFor="paymentMode" className="form-label">Select Payment Mode:</label>
                <select
                  id="paymentMode"
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
                <label htmlFor="address" className="form-label">Delivery Address:</label>
                <textarea
                  id="address"
                  className="form-input resize-none"
                  placeholder="Enter your delivery address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Book Gas Cylinder
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Booking History */}
          <div className="card">
            <h3 className="card-title">Booking History</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No bookings found.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div 
                    key={booking._id} 
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Payment: {booking.paymentMode}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Distribution */}
          <div className="card">
            <h3 className="card-title">Payment Mode Distribution</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Pie
                data={{
                  labels: payment.labels,
                  datasets: [{
                    data: payment.values,
                    backgroundColor: ['#F59E0B', '#10B981', '#3B82F6'],
                    borderWidth: 1,
                  }],
                }}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>
        </div>

        {/* Agency Notices */}
        <div className="card mt-8">
          <h3 className="card-title">Agency Notices</h3>
          {notices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notices available.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div 
                  key={notice._id} 
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <h4 className="font-medium text-blue-900 mb-2">{notice.title}</h4>
                  <p className="text-blue-800 text-sm">{notice.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Dashboard;