import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Manager = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "Manager") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const filteredUsers = response.data.filter(
        (user) => user.role === "User"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePermissionChange = async (userId, permission, value) => {
    const userToUpdate = users.find((user) => user.id === userId);

    if (userToUpdate) {
      const updatedPermissions = {
        ...userToUpdate.permissions,
        [permission]: value,
      };

      try {
        await axios.patch(`http://localhost:3001/users/${userId}`, {
          permissions: updatedPermissions,
        });

        setUsers(
          users.map((user) =>
            user.id === userId
              ? { ...user, permissions: updatedPermissions }
              : user
          )
        );
        setEditingUserId(null);
      } catch (error) {
        console.error("Error updating permissions:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <Header />
      <div className="max-w-6xl mt-10 mx-auto">
        <h1 className="text-3xl font-serif text-pink-600 text-center mb-12">
          Manager Panel - User Permissions
        </h1>

        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-50">
                <tr>
                  <th className="p-4">NAME</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">CREATE</th>
                  <th className="p-4">UPDATE</th>
                  <th className="p-4">DELETE</th>
                  <th className="p-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-pink-50">
                    <td className="p-4">
                      {user.fName} {user.lName}
                    </td>
                    <td className="p-4">{user.email}</td>
                    {["create", "update", "delete"].map((permission) => (
                      <td className="p-4" key={permission}>
                        {editingUserId === user.id ? (
                          <input
                            type="checkbox"
                            checked={user.permissions?.[permission] || false}
                            onChange={(e) =>
                              handlePermissionChange(
                                user.id,
                                permission,
                                e.target.checked
                              )
                            }
                          />
                        ) : (
                          <span>
                            {user.permissions?.[permission] ? "Yes" : "No"}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="p-4">
                      <button
                        onClick={() =>
                          setEditingUserId(
                            editingUserId === user.id ? null : user.id
                          )
                        }
                        className="px-3 py-1 text-yellow-600 hover:text-yellow-700"
                      >
                        {editingUserId === user.id
                          ? "Cancel"
                          : "Edit Permissions"}
                      </button>
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

export default Manager;
