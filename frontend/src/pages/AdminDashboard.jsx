import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, noticesRes] = await Promise.all([
          axios.get('/bookings/all'),
          axios.get('/notices'),
        ]);
        setBookings(bookingsRes.data);
        setNotices(noticesRes.data);
      } catch (err) {
        console.error('Admin data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: res.data.status } : b));
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const postNotice = async () => {
    if (!newNotice.trim()) return;
    try {
      const res = await axios.post('/notices', {
        title: 'Notice',
        content: newNotice,
      });
      setNotices((prev) => [...prev, res.data]);
      setNewNotice('');
    } catch (err) {
      console.error('Posting notice failed:', err);
    }
  };

  const chartData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Booking Status Count',
        data: [
          bookings.filter((b) => b.status === 'pending').length,
          bookings.filter((b) => b.status === 'approved').length,
          bookings.filter((b) => b.status === 'rejected').length,
        ],
        backgroundColor: ['#facc15', '#4ade80', '#f87171'],
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage bookings, notices and analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Analytics Chart */}
        <div className="card">
          <h3 className="card-title">Booking Analytics</h3>
          <div className="max-w-xl">
            <Bar data={chartData} />
          </div>
        </div>

        {/* All Bookings */}
        <div className="card">
          <h3 className="card-title">All Bookings</h3>
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          booking.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.paymentMode}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{booking.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200" onClick={() => updateStatus(booking._id, 'approved')}>Approve</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200" onClick={() => updateStatus(booking._id, 'rejected')}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Post New Notice */}
        <div className="card">
          <h3 className="card-title">Post New Notice</h3>
          <div className="space-y-4">
            <textarea className="form-input resize-none" rows="3" value={newNotice} onChange={(e) => setNewNotice(e.target.value)} placeholder="Type your notice here..." />
            <button className="btn-primary" onClick={postNotice}>Post Notice</button>
          </div>
        </div>

        {/* Notices */}
        <div className="card">
          <h3 className="card-title">All Notices</h3>
          {notices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notices found.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">{notice.title}</h4>
                  <p className="text-blue-800 text-sm">{notice.content}</p>
                  <p className="text-blue-600 text-xs mt-2">Posted on: {new Date(notice.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
