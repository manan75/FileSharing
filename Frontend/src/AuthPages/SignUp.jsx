// src/pages/Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send form to backend
    console.log("Signup submitted:", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-6 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
