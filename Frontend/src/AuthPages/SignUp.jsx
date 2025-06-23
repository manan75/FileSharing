import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Make sure to define VITE_BACKEND_URL in your .env file
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Signup = () => {
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.name || !form.password) {
      setMessage("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendURL}/api/auth/register`,
        { name: form.name, password: form.password },
        { withCredentials: true }
      );

      if (data.success) {
        setMessage("Registration successful! Please login.");
        setForm({ name: "", password: "" });
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {message && (
          <p className="mb-4 text-center text-red-500">{message}</p>
        )}

        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 mb-6 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
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
