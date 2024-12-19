import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser) {
      navigate('/');
      return;
    }

    setUser(storedUser);

    const fetchStats = async () => {
      try {
        const statsResponse = await axios.get(`http://localhost:3001/userData`);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    confirm("Do you really want to logout?");
    navigate('/');
  };

  if (!user) return null;

  const roleContent = () => {
    if (user.role === 'admin') {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">User Role Management</h3>
            <p className="mt-2 mb-7 text-gray-600">Get started and manage roles of all using DoBeeDo.</p>
            <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Start Now</button>
          </div>
        </div>
      );
    } 
    else if (user.role === 'manager') {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">User Permissions Management</h3>
            <p className="mt-2 mb-7 text-gray-600">Get started and assign user permissions for DoBeeDo. </p>
            <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Start Now</button>
          </div>
        </div>
      );
    } 
    else {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800">My Tasks</h3>
            <p className="mt-2 text-gray-600">Completed: {stats.completedTasks}</p>
            <p className="mt-2 mb-4 text-gray-600">Pending: {stats.pendingTasks}</p>
            <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Get Started</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="src/images/logo.png" alt="Logo" className="h-12 mr-4"/>
        </div>
        <div>
          <button 
            onClick={handleLogout}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Logout
          </button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome, {user.fName} !
            </h2>
            <p className="text-gray-600 mt-2">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </p>
          </div>

          {roleContent()}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;


