import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import axios from 'axios';
import EditForm from './pages/EditForm';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Register = lazy(() => import('./pages/Register'));
const MyForms = lazy(() => import('./pages/MyForms'));

const App = () => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const auth_token = localStorage.getItem('auth_token');

  // set credentials true for cookies in axios
  axios.defaults.withCredentials = true;

  // send token in header with every api
  const token = localStorage.getItem("auth_token");
  if (token) {
    axios.defaults.headers.common["auth_token"] = `Bearer ${token}`;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/my-forms' element={<MyForms />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/edit-form/:id' element={<EditForm />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
