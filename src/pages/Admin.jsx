import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import axios from 'axios';

const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'Manager',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    role: 'User',
    status: 'Inactive'
  }
];

const Admin = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    confirm("Do you really want to logout?");
    navigate('/');
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <Header/>
      <h1 className="text-4xl font-serif text-pink-500 text-center mt-6 mb-8">Admin Panel - Role Management</h1>
      <div className="container mx-auto bg-white rounded-xl shadow-xl p-10 mt-10">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">NAME</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">EMAIL</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">ROLE</th>
                <th className="px-4 py-3 text-left text-s font-medium text-gray-500">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-pink-50 transition">
                  <td className="px-4 py-4 text-left whitespace-nowrap">{user.name}</td>
                  <td className="px-4 py-4 text-left whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-4 text-left whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin' 
                        ? 'bg-red-100 text-red-800' 
                        : user.role === 'Manager' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-yellow-500 hover:text-yellow-600 transition"
                      >Change Role
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-600 transition"
                      >Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;