import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FormCard = ({ id, title, description, type, setReload }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${BACKEND_URL}/api/forms/${id}`);
      console.log(data.message);
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      setReload((prev) => !prev);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-[350px] rounded overflow-hidden shadow-lg bg-white p-4 m-4'>
        <div className='flex justify-end space-x-2'>
          {type === 'admin' ? (
            ''
          ) : (
            <Link to={`/edit-form/${id}`}>
              <FaEdit
                className='text-gray-500 cursor-pointer'
              />
            </Link>
          )}

          {loading ? (
            <div className='w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
          ) : (
            <FaTrash
              className='text-red-500 cursor-pointer'
              onClick={handleDelete}
            />
          )}
        </div>
        <div className='flex justify-between items-center px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{title}</div>
        </div>
        <p className='text-gray-700 text-base px-6'>{description}</p>
      </div>
      <SnackbarProvider />
    </>
  );
};

export default FormCard;
