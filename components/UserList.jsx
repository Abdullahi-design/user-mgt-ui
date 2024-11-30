"use client"
import UserCard from './UserCard';
import { useState } from 'react';
import UserForm from './UserForm';
import UserModal from './UserModal';
import { MdOutlineClose } from "react-icons/md";

export default function UserList({ users }) {
  const [showAddUserModal, setShowAddUserModal] = useState(false); 
  const [showUserModal, setShowUserModal] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleOpenAddUserModal = () => setShowAddUserModal(true);
  const handleCloseAddUserModal = () => setShowAddUserModal(false);

  const handleOpenUserModal = (user, editMode = false) => {
    setSelectedUser(user);
    setIsEditMode(editMode);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleToggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleClickOutside = () => {
    setOpenDropdown(null);
  };

  const handleSubmit = (updatedUser) => {
    console.log("Updated User Data:", updatedUser);
    handleCloseUserModal();
  };

  const colorMap = {
    purple: "border-purple-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
  };

  return (
    <div className="container mx-auto p-6" onClick={handleClickOutside}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
        <button
          onClick={handleOpenAddUserModal}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          Create
        </button>
      </div>

      <div className="hidden md:block overflow-y-auto overflow-x-hidden max-h-[77vh]">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Photo</th>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Name</th>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Email</th>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Role</th>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Status</th>
              <th className="py-2 px-4 border-b font-medium text-gray-600">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center cursor-pointer hover:bg-gray-100" onClick={() => handleOpenUserModal(user, false)}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={user.photo || '/assets/images/avatars/user.png'}
                    alt={`${user.name}'s profile`}
                    className={`w-10 h-10 rounded-full border-2 ${
                      colorMap[user.color] || "border-gray-500"
                    }`}
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <p className={`${user.status === 'Active' ? 'text-green-500 bg-green-100 w-full py-[0.15rem] px-1 text-xs rounded-lg' : 'text-red-500 bg-red-100 w-full py-[0.15rem] px-1 text-xs rounded-lg'}`}>
                    {user.status}
                  </p>
                </td>
                <td className="py-2 px-4 border-b relative">
                  <div className="relative inline-block text-left">
                    <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          // handleToggleDropdown(user.id);
                          handleOpenUserModal(user, true)
                        }}
                        className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded focus:outline-none"
                      >
                        ✎ Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden overflow-y-auto overflow-x-hidden max-h-[77vh]">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            openDropdown={openDropdown}
            onClose={handleCloseUserModal}
            handleToggleDropdown={handleToggleDropdown}
            handleOpenUserModal={handleOpenUserModal}
          />
        ))}
      </div>

      {/* Modals for adding and viewing/editing users */}
      {showAddUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className='flex justify-between'>
              <h2 className="text-xl font-semibold mb-4">Add New User</h2>
              <MdOutlineClose onClick={handleCloseAddUserModal} className="w-6 h-6 border border-red-600 p-1 rounded-full text-red-400 hover:text-red-600 cursor-pointer"/>
            </div>
            <UserForm onSubmit={(newUser) => console.log(newUser)} onClose={handleCloseAddUserModal} />
          </div>
        </div>
      )}

      {/* Modal for Viewing/Editing User */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          isEditMode={isEditMode}
          onClose={handleCloseUserModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
