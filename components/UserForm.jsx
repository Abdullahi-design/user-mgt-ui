"use client";

import { useActionState, useRef, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SubmitButton from "./SubmitButton";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { createUser } from "../utils/action";

const initialState = {
  successMsg: "",
  errorMsg: "",
};

export default function UserForm() {
  const [state, formAction] = useActionState(createUser, initialState);
  const [previewVisible, setPreviewVisible] = useState(false); // Control preview visibility
  const [imageSrc, setImageSrc] = useState(null); // Store image preview data
  const [file, setFile] = useState(null); // Store the file for submission
  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Save file for backend submission
      setPreviewVisible(true); // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result); // Save image source for preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setPreviewVisible(false); // Hide preview
    setImageSrc(null); // Reset image source
    setFile(null); // Clear file
    if (photoInputRef.current) {
      photoInputRef.current.value = ""; // Clear file input value
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      {!previewVisible && ( // Show input field only if no preview is visible
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
      )}

      {previewVisible && (
        <div className="relative mt-4">
          <img
            src={imageSrc}
            alt="User preview"
            className="w-24 h-24 border rounded object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 left-20 bg-red-800 text-white w-6 h-6 flex items-center justify-center rounded-full"
          >
            &times;
          </button>
        </div>
      )}

      <InputField label="Name" name="name" type="text" />
      <InputField label="Email" name="email" type="email" />
      <SelectField
        label="Role"
        name="role"
        options={[
          { value: "Admin", label: "Admin" },
          { value: "User", label: "User" },
        ]}
      />
      <SelectField
        label="Status"
        name="status"
        options={[
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
      />

      <SubmitButton />

      {state?.successMsg && (
        <div className="mt-4">
          <SuccessModal msg={state?.successMsg} />
        </div>
      )}
      {state?.errorMsg && (
        <div className="mt-4">
          <ErrorModal msg={state?.errorMsg} />
        </div>
      )}
    </form>
  );
}