import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBolt,
  FaMapMarkerAlt,
  FaLock,
  FaRegUser,
  FaRegCalendarCheck,
  FaTruck,
  FaQuoteLeft,
  FaEnvelope,
  FaPhoneAlt,
  FaLocationArrow,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
  { icon: <FaBolt />, title: 'Easy Booking', desc: 'Book a cylinder in just 2 clicks!', border: 'border-yellow-400' },
  { icon: <FaTruck />, title: 'Fast Delivery', desc: 'Delivery within 24 hours guaranteed', border: 'border-green-500' },
  { icon: <FaLock />, title: 'Secure Payment', desc: 'Pay securely via UPI, Paytm, or Cash', border: 'border-blue-600' },
  { icon: <FaRegCalendarCheck />, title: 'Booking History', desc: 'Track all your past bookings easily', border: 'border-purple-500' },
];

const howItWorks = [
  { icon: <FaRegUser />, title: 'Register', desc: 'Sign up in seconds with your email or phone.' },
  { icon: <FaRegCalendarCheck />, title: 'Book Cylinder', desc: 'Choose your address, date, and payment mode.' },
  { icon: <FaTruck />, title: 'Get Delivery', desc: 'Sit back and relax while we deliver to your door.' },
];

const testimonials = [
  { name: 'Lavanya Chawla', location: 'Delhi, India', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Quick and reliable service. Highly satisfied with the booking process!', color: 'border-blue-200' },
  { name: 'Gourav Doda', location: 'Mumbai, India', img: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'The dashboard makes it easy to manage my bookings and track delivery status.', color: 'border-green-200' },
  { name: 'Kanav Sharma', location: 'Jalandhar, India', img: 'https://randomuser.me/api/portraits/men/67.jpg', text: 'Great support team and always on time delivery. Highly recommended!', color: 'border-purple-200' },
];

const HomePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user && user.email === 'harshulchawla1408@gmail.com') {
        setIsAdmin(true);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center z-10 px-6 max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Welcome to Gasify</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-6">24/7 Online Booking & Fast Delivery</p>
          <Link
            to="/booking"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Why Choose Gasify?</h2>
            <p className="text-gray-600">Fast, reliable and secure gas cylinder delivery at your doorstep</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-md p-8 text-center border-t-4 ${f.border} hover:shadow-xl transition transform hover:-translate-y-1`}
              >
                <div className="text-4xl text-gray-800 mb-3 flex justify-center">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">How It Works</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600 text-3xl shadow-sm">{step.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Access Section */}
      {isAdmin && (
        <section className="py-12 bg-green-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Admin Panel</h2>
            <p className="text-lg text-green-600 mb-6">Manage users, bookings, and notices from here.</p>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Go to Admin Dashboard
            </button>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">What Our Customers Say</h2>
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className={`bg-white rounded-2xl shadow-md p-8 border ${t.color} hover:shadow-xl transition transform hover:-translate-y-1`}>
                  <FaQuoteLeft className="text-blue-200 text-2xl mb-3" />
                  <p className="italic text-gray-700 mb-4">"{t.text}"</p>
                  <div className="flex items-center">
                    <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2" />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative py-20 text-white flex items-center justify-center"
        style={{ backgroundImage: 'url(/pic.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center max-w-4xl px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Fuel Your Convenience?</h2>
          <p className="mb-8 text-lg">Join thousands of customers who trust Gasify for hassle-free cylinder delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
