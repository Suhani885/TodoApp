import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    setUsers(response.data);
  };

  const handleRoleChange = async (userId, newRole) => {
    const userToUpdate = users.find((user) => user.id === userId);
    await axios.patch(`${BASE_URL}/users/${userId}`, {
      ...userToUpdate,
      role: newRole,
    });

    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    setEditingUserId(null);
  };

  const getRoleColor = (role) => {
    if (role === "Admin") {
      return "bg-red-100 text-red-800";
    } else if (role === "Manager") {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <Header />
      <div className="max-w-6xl mt-10 mx-auto">
        <h1 className="text-3xl font-serif text-pink-600 text-center mb-12">
          Admin Panel - Role Management
        </h1>

        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-50">
                <tr>
                  <th className="p-4">NAME</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">ROLE</th>
                  <th className="p-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-pink-50">
                    <td className="p-4">
                      {`${user.fName} ${user.lName}`.trim()}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      {editingUserId === user.id ? (
                        <select
                          defaultValue={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="User">User</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            setEditingUserId(
                              editingUserId === user.id ? null : user.id
                            )
                          }
                          className="px-3 py-1 text-yellow-600 hover:text-yellow-700"
                        >
                          {editingUserId === user.id ? "Cancel" : "Change Role"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
