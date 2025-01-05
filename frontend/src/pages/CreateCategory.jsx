import React, { useState } from 'react';
import { createNewCategory } from '../services/operations/productApi';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../utils/constants';
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import { FaTag, FaRegListAlt } from 'react-icons/fa'; // React icons for Category Name and Description
import { IoMdCreate } from 'react-icons/io'; // React icon for Create Category button

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: '', desc: '' });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    await createNewCategory(formData.title, formData.desc, token, navigate);
  }

  if (!token || user.accountType !== ACCOUNT_TYPE.ADMIN) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50 flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl m-2 rounded-lg p-10 w-full max-w-lg space-y-8"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8 tracking-wide">
          Create New Category
        </h1>
        
        {/* Category Name */}
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Category Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter name of the category"
              name="title"
              value={formData.title}
              required
              onChange={changeHandler}
              className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-2 focus:border-blue-400 focus:outline-none transition duration-300"
            />
            <FaTag className="absolute top-5 left-5 text-gray-400" />
          </div>
        </div>

        {/* Category Description */}
        <div className="mb-6">
          <label className="block text-xl font-medium text-gray-700 mb-2">Category Description</label>
          <div className="relative">
            <textarea
              name="desc"
              placeholder="Enter description of the category"
              value={formData.desc}
              required
              onChange={changeHandler}
              rows="4"
              className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-2 focus:border-blue-400 focus:outline-none transition duration-300"
            />
            <FaRegListAlt className="absolute  top-6 left-4 text-gray-400" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 bg-purple-500 text-white text-lg font-semibold rounded-lg shadow-xl hover:bg-purple-700 transition duration-300 flex items-center justify-center"
        >
          <IoMdCreate className="mr-2" />
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
