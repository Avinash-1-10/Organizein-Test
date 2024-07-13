import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditForm = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getFormDetails = async (setValues) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/api/forms/id/${id}`);
      setValues({
        title: data.data.title,
        description: data.data.description,
      });
    } catch (error) {
      console.log(error.response);
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${BACKEND_URL}/api/forms/${id}`, values);
      enqueueSnackbar(data.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
      setTimeout(() => {
        navigate('/my-forms');
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        enqueueSnackbar('Unauthorized user', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        });
        return;
      }
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, 'Title must be at least 5 characters long')
      .required('Title is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters long')
      .required('Description is required'),
  });

  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Edit Information
          </h2>
          <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ setValues }) => {
              useEffect(() => {
                getFormDetails(setValues);
              }, []);
              return (
                <Form>
                  <div className='mb-4'>
                    <label
                      htmlFor='title'
                      className='block text-gray-700 font-medium mb-2'
                    >
                      Title
                    </label>
                    <Field
                      type='text'
                      id='title'
                      name='title'
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    />
                    <ErrorMessage
                      name='title'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='description'
                      className='block text-gray-700 font-medium mb-2'
                    >
                      Description
                    </label>
                    <Field
                      as='textarea'
                      id='description'
                      name='description'
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-500'
                    disabled={loading}
                  >
                    Update
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <SnackbarProvider />
    </>
  );
};

export default EditForm;
