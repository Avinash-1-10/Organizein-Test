import React, { useState } from "react";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const user = { name, email, password };

      const { data } = await axios.post(
        "http://localhost:8000/api/users/register",
        user
      );

      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      })
    } catch (error) {
      console.log(error.response.data.message);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <SnackbarProvider />
    </>
  );
};

export default Register;
