"use client";

import { useRef, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SubmitButton from "./SubmitButton";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { createUser } from "../utils/action";
import { useActionState } from "react";
import { MdOutlineClose } from "react-icons/md";

// const initialState = {
//   successMsg: "",
//   errorMsg: "",
// };

export default function UserForm({onClose}) {
  // const [state, formAction] = useActionState(createUser, initialState);
  const [previewSrc, setPreviewSrc] = useState("");
  const [uploadErrorMsg, setUploadErrorMsg] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const photoInputRef = useRef(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const statusRef = useRef();
  const roleRef = useRef();

  const MAX_WIDTH = 600; // Maximum width in pixels for passport-size
  const MAX_HEIGHT = 600; // Maximum height in pixels for passport-size
  const MIN_WIDTH = 300; // Minimum width in pixels for passport-size
  const MIN_HEIGHT = 300; // Minimum height in pixels for passport-size
  
  const handleRemoveImage = () => {
    setPreviewSrc("");
    if (photoInputRef.current) {
      photoInputRef.current.value = ""; // Reset the file input
    }
  };

  const handlePhotoChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
  
    if (!file) {
      return;
    }
  
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadErrorMsg("Please upload a valid image file.");
      return;
    }
  
    // Validate image dimensions
    const img = new Image();
    const reader = new FileReader();
  
    reader.onload = (readerEvent) => {
      img.onload = () => {
        const { width, height } = img;
  
        if (width < MIN_WIDTH || width > MAX_WIDTH || height < MIN_HEIGHT || height > MAX_HEIGHT) {
          setUploadErrorMsg(`Image dimensions must be between ${MIN_WIDTH}x${MIN_HEIGHT} and ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`);
          return;
        }
  
        // Set preview if dimensions are valid
        setUploadErrorMsg("");
        setPreviewSrc(readerEvent.target.result);
      };
  
      img.src = readerEvent.target.result;
    };
  
    reader.readAsDataURL(file); // Read the file as data URL
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append form fields
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("role", roleRef.current.value);
    formData.append("status", statusRef.current.value);
  
    // Append the selected photo if it exists
    const file = photoInputRef.current.files[0]; // Get the first file selected
    if (file) {
      formData.append("photo", file);
    } else {
      console.log("No photo selected");
    }
  
    console.log("Submitting formData:", Object.fromEntries(formData.entries()));
  
    const result = await createUser(formData);
    
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={previewSrc ? "hidden" : ""}>
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
        {uploadErrorMsg &&(
          <small className="text-red-500 font-bold">{uploadErrorMsg}</small>
        )}

      {previewSrc && (
        <div className="relative mt-4 md:mx-auto">
          <img
            src={previewSrc}
            alt="User preview"
            className="w-24 h-24 border rounded object-cover mt-2"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 left-20 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transform -translate-y-2 -translate-x-2"
          >
            <MdOutlineClose className="w-4 h-4"/>
          </button>
        </div>
      )}

      <InputField label="Name" name="name" type="text" ref={nameRef}/>
      <InputField label="Email" name="email" type="email" ref={emailRef}/>
      <SelectField
        label="Role"
        ref={roleRef}
        name="role"
        options={[
          { value: "Admin", label: "Admin" },
          { value: "User", label: "User" },
        ]}
      />
      <SelectField
        label="Status"
        ref={statusRef}
        name="status"
        options={[
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
      />

      <SubmitButton />

      {successMessage && (
        <div className="mt-4">
          <SuccessModal msg={successMessage} />
        </div>
      )}
      {errorMessage && (
        <div className="mt-4">
          <ErrorModal msg={errorMessage} />
        </div>
      )}
    </form>
  );
}