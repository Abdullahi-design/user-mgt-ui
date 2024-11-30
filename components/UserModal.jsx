"use client";

import { useRef, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import SubmitButton from './SubmitButton';
import SuccessModal from './SuccessModal';
import { editUser } from '@/utils/action';
import ErrorModal from './ErrorModal';

export default function UserModal({ user, isEditMode, onClose }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const statusRef = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manually construct form data
    const formData = {
      id: user.id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      status: statusRef.current.value,
    };

    console.log("Submitting formData:", formData);

    const result = await editUser(formData);

    console.log('result', result);

    if (result?.successMsg) {
      setSuccessMessage(result.successMsg);
      setTimeout(() => {
        onClose(); 
      }, 2000);
    } else if (result?.errorMsg) {
      setErrorMessage(result.errorMsg);
    }
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
                defaultValue={user?.name || ''}
                ref={nameRef}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email || ''}
                ref={emailRef}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                defaultValue={user?.status || 'Active'}
                ref={statusRef}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <SubmitButton />
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

        {/* Success message */}
        {successMessage && (
          <div className="mt-4">
            <SuccessModal msg={successMessage}/>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4">
            <ErrorModal msg={errorMessage} />
          </div>
        )}
      </div>
    </div>
  );
}
