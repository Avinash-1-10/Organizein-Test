import React, { useState } from 'react';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const user = { ...values };
      const { data } = await axios.post(`${BACKEND_URL}/api/users/register`, user);

      enqueueSnackbar(data.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.log(error.response.data.message);
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
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters long'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    isAdmin: Yup.boolean(),
  });

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
          {error && (
            <div className='mb-4 text-red-500 text-center'>{error}</div>
          )}
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              isAdmin: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                <div className='mb-4'>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Name
                  </label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Email
                  </label>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='password'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Password
                  </label>
                  <Field
                    type='password'
                    id='password'
                    name='password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Confirm Password
                  </label>
                  <Field
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  <ErrorMessage
                    name='confirmPassword'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
                <div className='mb-6 flex items-center gap-3'>
                  <label htmlFor='isAdmin' className='block text-gray-700 font-medium mb-2'>
                    Admin
                  </label>
                  <Field
                    type='checkbox'
                    id='isAdmin'
                    name='isAdmin'
                    className='w-4 h-4'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed'
                  disabled={loading || isSubmitting}
                >
                  Register
                </button>
              </FormikForm>
            )}
          </Formik>
          <p className='text-gray-600 text-center mt-4'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-blue-500 hover:underline'>
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
