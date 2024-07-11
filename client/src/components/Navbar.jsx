import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">MyLogo</a>
        </div>
        <div className="flex space-x-10 items-center">
          <Link to="/my-forms" className="text-gray-300 hover:text-white">
            My Forms
          </Link>
          <Link
            to="/admin-dashboard"
            className="text-gray-300 hover:text-white"
          >
            Admin Dashboard
          </Link>
          <div className="w-10 h-10 bg-white flex items-center justify-center text-lg font-semibold rounded-full">
            {user && <p>{user?.name.slice(0, 1)}</p>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
