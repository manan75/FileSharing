// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send form to backend
    console.log("Login submitted:", form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

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
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
