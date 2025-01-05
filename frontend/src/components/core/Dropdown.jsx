import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdLogin, MdHome, MdOutlinePermContactCalendar } from "react-icons/md";
import { RiLoginCircleLine, RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidBookContent, BiCategory } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { logout } from "../../services/operations/authAPI";
import { apiConnector } from "../../services/apiconnector";
import { categoryEndpoints } from "../../services/apis";

const MenuSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

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


  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryOpen = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const Data = {
    categories: [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
      { id: 3, name: "Books" },
      { id: 4, name: "Home Decor" },
      { id: 5, name: "Sports Equipment" },
    ],
  };

  const handleNavigate = (path) => {
    setIsModalOpen(false); // Close modal before navigation
    navigate(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="flex sm:hidden h-[5vh] items-center px-5 text-white">
        <GiHamburgerMenu className="text-2xl" onClick={handleModalOpen} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] bg-gray-900 text-white z-50 transition-transform transform ${isModalOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Menu</h2>
          <IoClose
            className="text-3xl cursor-pointer hover:text-gray-400"
            onClick={handleModalOpen}
          />
        </div>

        <div className="flex flex-col mt-6 px-5 space-y-6">
          {/* Authentication Links */}
          {
            !user ? (<><Link
              to="/login"
              className="flex items-center gap-3 text-lg hover:text-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              <MdLogin />
              Login
            </Link><Link
              to="/signup"
              className="flex items-center gap-3 text-lg hover:text-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
                <RiLoginCircleLine />
                Signup
              </Link></>) : (<button
                onClick={() => {
                  logout(dispatch, navigate); // Perform logout
                  setIsModalOpen(false); // Close the sidebar
                }}
                className=" w-[50%] px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition"
              >
                Logout
              </button>
            )
          }


          {/* Navigation Links */}
          <div className="border-t border-gray-700"></div>
          <Link
            to="/"
            className="flex items-center gap-3 text-lg hover:text-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            <MdHome />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 text-lg hover:text-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            <BiSolidBookContent />
            About
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-3 text-lg hover:text-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            <MdOutlinePermContactCalendar />
            Contact
          </Link>

          {/* Admin-only links */}
          {token && user && user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <div className="mt-4 space-y-4 flex flex-col ">
              <button
                className="w-[50%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleNavigate("/add-product")}
              >
                Add Product
              </button>
              <button
                className="w-[50%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleNavigate("/create-category")}
              >
                Create Category
              </button>
            </div>
          )}

          {/* Categories Dropdown */}
          <div
            onClick={handleCategoryOpen}
            className="flex items-center gap-3 text-lg cursor-pointer hover:text-gray-400 mt-6"
          >
            <BiCategory />
            Category
            <RiArrowDropDownLine
              className={`text-2xl transition-transform ${isCategoryOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>
          {isCategoryOpen && (<div>
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : (
              <div className="ml-6 mt-2 space-y-2">
                {subLinks.map((category) => (
                  <Link
                  to={`/category/${category.name.split(" ").join("").toLowerCase()}`}
                    key={category.id}
                    className="text-sm hover:text-gray-400 cursor-pointer flex flex-col"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

          </div>)}
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
