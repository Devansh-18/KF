import React, { useEffect, useState } from 'react';
import Dropdown from '../core/Dropdown';
import { navLinks } from '../../data/Navlinks';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';


import { apiConnector } from '../../services/apiconnector';
import { categoryEndpoints } from '../../services/apis';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector('GET', categoryEndpoints.CATEGORIES_API);

        setSubLinks(res.data.allCategory);
      } catch (error) {
        console.log('Could not fetch Categories.', error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <nav className="top-0 sticky z-50 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            KF
          </div>

          {/* Navigation Links (visible on larger screens) */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {navLinks.map((navlink, index) => (
              <Link
                key={index}
                to={navlink.link}
                className="relative group text-lg transition duration-200 hover:text-teal-400"
              >
                {navlink.title}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {/* Categories Dropdown */}
            {/* Categories Dropdown */}
            <div className="relative group ">
              <div className="text-lg cursor-pointer hover:text-teal-400 m-4">
                Categories
              </div>
              <div
                className="absolute top-12 left-0 mt-2 hidden  bg-white text-black rounded-md shadow-lg group-hover:block transition-opacity duration-300 ease-in-out"
              >
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : (
                  subLinks.length > 0 ? (
                    <ul>
                      {subLinks.map((category, index) => (
                        <li key={index} className="border-b last:border-none">
                          <Link
                            to={`/category/${category.name.split(" ").join("").toLowerCase()}`}
                            className="block px-4 py-3 hover:bg-gray-100 rounded-md transition"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center">No Categories Found</div>
                  )
                )}
              </div>
            </div>


          </div>

          {/* Buttons and Dropdown */}
          <div className="flex items-center gap-4">
            {token && user && user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <div className="hidden sm:flex gap-4">
                <button
                  onClick={() => navigate('/add-product')}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition"
                >
                  Add Product
                </button>
                <button
                  onClick={() => navigate('/create-category')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition"
                >
                  Create Category
                </button>
              </div>
            )}
            {user ? (
              <button
                onClick={() => logout(dispatch, navigate)}
                className="hidden sm:block px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:block px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition"
              >
                Login/SignUp
              </button>
            )}
            {/* Dropdown for smaller screens */}
            <div className="flex sm:hidden">
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
