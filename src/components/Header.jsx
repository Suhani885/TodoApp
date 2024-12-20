import React from 'react';
import {Link, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    confirm("Do you really want to logout?");
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <img src="src/images/logo.png" className="h-10" alt="Logo"/>
          <div>
          <button onClick={handleLogout} className="bg-pink-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Logout
          </button>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Header