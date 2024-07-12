import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/forms", {
        title,
        description,
      });
      console.log(data);
      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.log(error)
      if(error.response.status === 401) {
        enqueueSnackbar("Unauthorized user", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
        return;
      }
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
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Submit Information
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <SnackbarProvider />
    </>
  );
};

export default Form;
