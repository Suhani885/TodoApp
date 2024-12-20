import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${formData.email}&password=${formData.password}`);
      
      if (response.data.length > 0) {
        const user = response.data[0];
        
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl py-12 px-6">
        <div className="flex justify-center mb-3">
          <img src="src/images/logo.png" alt="Logo" className="max-h-20 object-contain"/>
        </div>
        <p className="text-center text-gray-500 mb-6">
          Please log in to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="pl-10 mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300" 
              placeholder="Enter your email" 
              required/>
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}" 
              className="pl-10 mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300" 
              placeholder="Enter your password" 
              required/>
          </div>
          <button type="submit" className="w-full py-3 px-4 font-semibold text-white bg-pink-500 hover:bg-pink-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;