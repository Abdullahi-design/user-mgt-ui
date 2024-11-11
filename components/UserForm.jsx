"use client";

import { useRef } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import SubmitButton from './SubmitButton';
import SuccessModal from './SuccessModal';
import { createUser } from '../utils/action';
import { useActionState } from 'react';

const initialState = {
  message: "",
};

export default function UserForm() {
  const [state, formAction] = useActionState(createUser, initialState);
  const photoInputRef = useRef(null);
  const photoPreviewRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (photoPreviewRef.current) {
          photoPreviewRef.current.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-gray-700">Upload Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          ref={photoInputRef}
          onChange={handlePhotoChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Image Preview</label>
        <img
          ref={photoPreviewRef}
          alt="User preview"
          className="w-24 h-24 border rounded object-cover mt-2"
        />
      </div>
      
      <InputField label="Name" name="name" type="text" />
      <InputField label="Email" name="email" type="email" />
      <SelectField
        label="Role"
        name="role"
        options={[
          { value: 'Admin', label: 'Admin' },
          { value: 'User', label: 'User' }
        ]}
      />
      <SelectField
        label="Status"
        name="status"
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]}
      />

      <SubmitButton />

      {state?.message && (
        <div className="mt-4">
          <SuccessModal msg={state?.message} />
        </div>
      )}
    </form>
  );
}
