import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import axios from 'axios';

function Manager() {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    confirm("Do you really want to logout?");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <Header/>
      <h1 className="text-4xl font-serif text-pink-500 text-center mt-6 mb-8">Manager Panel - User Permissions Management</h1>
      <div className="container mx-auto bg-white rounded-xl shadow-xl p-10 mt-10">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">NAME</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">EMAIL</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">PERMISSIONS</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Manager