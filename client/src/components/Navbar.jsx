import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      setUser(null);
      setShowMenu(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-blue-500'
      : 'text-gray-300 hover:text-white';
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>
          <Link to='/'>Form App</Link>
        </div>
        <div className='flex space-x-10 items-center'>
          <Link to='/' className={`${getLinkClass('/')}`}>
            Create
          </Link>
          <Link to='/my-forms' className={`${getLinkClass('/my-forms')}`}>
            My Forms
          </Link>
          {user?.isAdmin && (
            <Link
              to='/admin-dashboard'
              className={`${getLinkClass('/admin-dashboard')}`}
            >
              Admin Dashboard
            </Link>
          )}
          <div className='relative'>
            <div
              className='w-10 h-10 bg-white flex items-center justify-center text-lg font-semibold rounded-full cursor-pointer'
              onClick={() => setShowMenu(!showMenu)}
            >
              {user && <p>{user?.name.slice(0, 1)}</p>}
            </div>
            {showMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
                <button
                  className='block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white cursor-pointer w-full rounded-md'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
