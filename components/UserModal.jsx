"use client";

import { useState, useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";

export default function UserModal({ user, isEditMode, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isEditMode ? 'Edit User' : 'View User'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <MdOutlineClose className='w-6 h-6 text-red-400 hover:text-red-600 border border-red-500 rounded-full'/>
          </button>
        </div>

        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </form>
        ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
                <div className="flex items-center space-x-4 mb-4">
                    <img
                    src={user.photo || '/assets/images/avatars/user.png'}
                    alt={`${user.name}'s profile`}
                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                    <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                    <span className="bg-gray-200 text-gray-600 text-xs font-semibold rounded-full px-2 py-1 mr-2">
                        Role
                    </span>
                    <p className="text-gray-700">{user.role}</p>
                    </div>
                    <div className="flex items-center">
                    <span className="bg-gray-200 text-gray-600 text-xs font-semibold rounded-full px-2 py-1 mr-2">
                        Status
                    </span>
                    <p className={`text-xs font-semibold ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                        {user.status}
                    </p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}