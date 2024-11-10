"use client"

import Navbar from "../../components/Navbar";
import UserForm from "../../components/UserForm";

export default function page() {
  const handleAddUser = (newUser) => {
    // Logic to add user to JSON file goes here
    console.log('User Added:', newUser);
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Add User</h1>
        <UserForm onSubmit={handleAddUser} />
      </main>
    </div>
  );
}