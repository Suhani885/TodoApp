import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user) || {};

  const handleLogout = () => {
    if (confirm("Do you really want to logout?")) {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex content-center gap-1">
          <img src="src/assets/bow.png" className="h-8" alt="Bow" />
          <img src="src/assets/logo.png" className="h-10" alt="Logo" />
        </div>
        {user && (
          <div>
            <button
              onClick={handleLogout}
              className="bg-pink-500 flex content-center text-sm text-white px-4 py-2 gap-2 rounded-lg hover:bg-pink-600"
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
