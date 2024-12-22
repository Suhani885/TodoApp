import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${storedUser.id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user || !userData) return null;

  const roleContent = () => {
    if (user.role === "Admin") {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              User Role Management
            </h3>
            <p className="mt-2 mb-7 text-gray-600">
              Get started and manage roles of all using DoBeeDo.
            </p>
            <Link to="/admin">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (user.role === "Manager") {
      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
            <h3 className="mt-2 text-2xl font-bold text-gray-800">
              User Permissions Management
            </h3>
            <p className="mt-2 mb-7 text-gray-600">
              Get started and assign user permissions for DoBeeDo.{" "}
            </p>
            <Link to="/manager">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                Start Now
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      const completedTasks =
        userData.todos?.filter((todo) => todo.completed)?.length || 0;
      const pendingTasks =
        userData.todos?.filter((todo) => !todo.completed)?.length || 0;

      return (
        <div className="p-4 mt-8">
          <div className="bg-pink-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl mb-6 font-bold text-gray-800">My Tasks</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedTasks}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Pending Tasks</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingTasks}
                </p>
              </div>
            </div>
            <Link to="/todo">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome, {user.fName} !
            </h2>
            <p className="text-gray-600 mt-2">{user.role} Dashboard</p>
          </div>

          {roleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
