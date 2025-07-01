import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logoutUser } from '../firebase/auth';
import AdminAccess from './AdminAccess';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    let prev = window.pageYOffset;
    const handleScroll = () => {
      const curr = window.pageYOffset;
      setIsHidden(curr > prev && curr > 100);
      prev = curr;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle
  const toggleMenu = () => setIsMenuOpen(v => !v);

  // Logout
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/');
  };

  // Set user on auth change
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u) setUser({ name: u.displayName, email: u.email });
    });
    return () => unsub();
  }, [setUser]);

  const NavLinks = () => (
    <>  
      <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">Home</Link>
      <Link to="/booking" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">Bookings</Link>
      <Link to="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">Dashboard</Link>
      {location.pathname !== '/admin/dashboard' && (
        <button onClick={() => setAdminModalOpen(true)} className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">Admin Access</button>
      )}
    </>
  );

  return (
    <>
      <header className={`${isHidden ? '-translate-y-full' : 'translate-y-0'} fixed top-0 inset-x-0 z-50 bg-white transition-transform duration-300`}>        
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo Only */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Gasify Logo" className="h-20 w-auto object-contain transition-transform duration-200 hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Hi, user</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">Register</Link>
              </>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col px-6 pt-4 pb-6 space-y-2">
              <NavLinks />
              {user ? (
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="mt-2 w-full text-left px-3 py-2 bg-red-500 text-white rounded-lg font-semibold transition">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition">Login</Link>
                  <Link to="/register" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <AdminAccess isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  );
};

export default Header;
