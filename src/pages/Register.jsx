import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword: "",
    role: "User",
    permissions: {
      delete: true,
      update: true,
      create: true,
    },
    data: {
      completed: 0,
      pending: 0,
    },
    todos: [],
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const emailCheck = await axios.get(
        `http://localhost:3001/users?email=${formData.email}`
      );

      if (emailCheck.data.length > 0) {
        alert("Email already registered");
        return;
      }

      const response = await axios.post("http://localhost:3001/users", {
        fName: formData.fName,
        lName: formData.lName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        permissions: formData.permissions,
        todos: formData.todos,
        data: formData.data,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.error("Registration Error", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl py-12 px-7">
        <div className="flex justify-center mb-2">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="max-h-20 object-contain"
          />
        </div>
        <p className="text-center text-gray-500 mb-6">
          Join our community today
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2 relative">
              <input
                type="text"
                id="fname"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                maxLength="20"
                pattern="[a-zA-Z]+"
                className="pl-10 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-1/2 relative">
              <input
                type="text"
                id="lname"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                maxLength="20"
                pattern="[a-zA-Z]+"
                className="pl-10 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              className="pl-10 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}"
              className="pl-10 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              id="cPassword"
              name="cPassword"
              value={formData.cPassword}
              onChange={handleChange}
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}"
              className={`pl-10 block w-full px-4 py-2 bg-gray-50 border ${
                passwordError
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-pink-200"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-pink-300`}
              placeholder="Confirm Password"
              required
            />{" "}
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 font-semibold text-white bg-pink-500 hover:bg-pink-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-pink-500 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
