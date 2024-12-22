import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
      );

      if (response.data.length > 0) {
        const user = response.data[0];
        dispatch(setUser(user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-7 mx-7 static">
        <img
          src="src/assets/bow2.png"
          className="h-44 relative bottom-3.5 right-10"
          alt="Bow"
        />
        <div className="flex justify-center relative bottom-28">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="max-h-20 object-contain"
          />
        </div>
        <p className="text-center text-gray-500 relative bottom-28">
          Please log in to your account
        </p>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="relative bottom-16">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 font-semibold text-white bg-pink-500 hover:bg-pink-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center relative bottom-16">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-pink-500 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { setUser } from "./userSlice";

// const handleLogin = async () => {
//   try {
//     const response = await axios.post("http://localhost:3001/login", {
//       email,
//       password,
//     });

//     if (response.data) {
//       dispatch(setUser(response.data));
//       navigate("/dashboard");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
