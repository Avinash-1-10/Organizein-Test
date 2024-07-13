import React, { useState } from 'react';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        values
      );

      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('auth_token', data.data.auth_token);
      enqueueSnackbar(data.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
      navigate('/');
      window.location.reload();
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
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='max-w-md w-full bg-white shadow-md rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
          <Formik
            initialValues={{
              email: 'admin@gmail.com',
              password: 'Admin@12345',
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <FormikForm>
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
                <div className='mb-6'>
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
                <button
                  type='submit'
                  className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-500'
                  disabled={loading || isSubmitting}
                >
                  Login
                </button>
              </FormikForm>
            )}
          </Formik>
          <p className='text-gray-600 text-center mt-4'>
            Don't have an account?{' '}
            <Link to={'/register'} className='text-blue-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <SnackbarProvider />
    </>
  );
};

export default Login;
