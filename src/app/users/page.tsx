// src/app/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/config";

interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
}

const roleOptions = [
  "Admin",
  "Receptionist",
  "Nurse",
  "Doctor",
 
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states for creating/updating user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const url = roleFilter
        ? `${BACKEND_URL}/users?role=${roleFilter}`
        : `${BACKEND_URL}/users`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roleFilter) {
      setFilteredUsers(users.filter((user) => user.role === roleFilter));
    } else {
      setFilteredUsers(users);
    }
  }, [roleFilter, users]);

  const handleCreateOrUpdate = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (!formData.fullName || !formData.username || !formData.email || !formData.role) {
      setError("Please fill all required fields.");
      return;
    }

    if (!editingUser && !formData.password) {
      setError("Password is required for new user.");
      return;
    }

    try {
      const url = editingUser
        ? `${BACKEND_URL}/users/${editingUser._id}`
        : `${BACKEND_URL}/users`;

      const method = editingUser ? "PUT" : "POST";

      const body = editingUser
        ? {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            role: formData.role,
            ...(formData.password && { password: formData.password }),
          }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save user");
      }

      setIsModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to save user");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
              <button
                onClick={openCreateModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Add New User
              </button>
            </div>

            {/* Role Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">All Roles</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Users Table - Responsive */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                        {user.fullName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                        {user.username}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-black">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => openEditModal(user)}
                          className="mr-3 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {editingUser ? "Edit User" : "Create New User"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? "New Password (optional)" : "Password"}
                </label>
                <input
                  type="password"
                  placeholder={editingUser ? "Leave blank to keep current" : "Password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-md hover:bg-gray-100 transition text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdate}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}