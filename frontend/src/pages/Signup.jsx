import React, { useState } from "react";
import { sendOtp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import LoginIMG from '../assets/images/login.jpg'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    const signupData = { ...formData };
    try {
      dispatch(setSignupData(signupData));
      await sendOtp(formData.email, navigate, dispatch);
    } catch (error) {
      console.log(error.message);
      toast.error("Signup Failed");
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className='flex justify-center items-center  bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100'>
      <div className="flex flex-col lg:flex-row w-[90%] md:w-4/5 my-10 mx-auto items-center justify-center rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center items-start gap-6 p-8 md:p-12 bg-white bg-opacity-60 ">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center md:text-left">
         Register
          </h2>
          <p className="text-md md:text-lg text-center md:text-left">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 underline font-medium hover:text-purple-800"
            >
              Login
            </button>
          </p>
          <form onSubmit={submitHandler} className="flex flex-col gap-6 w-full">
            <label className="w-full">
              <p className="text-md md:text-md ml-2 mb-1">
                First Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={changeHandler}
                required
                className="p-4 rounded-lg text-sm md:text-base w-full border border-gray-300 focus:outline-none focus:border-2 focus:border-purple-400 text-gray-900 shadow-md transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="w-full">
              <p className="text-md md:text-md ml-2 mb-1">
                Last Name <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={changeHandler}
                required
                className="p-4 rounded-lg text-sm md:text-base w-full border border-gray-300 focus:outline-none focus:border-2 focus:border-purple-400 text-gray-900 shadow-md transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="w-full">
              <p className="text-md md:text-md ml-2 mb-1">
                Email <sup className="text-red-500">*</sup>
              </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={changeHandler}
                required
                className="p-4 rounded-lg text-sm md:text-base w-full border border-gray-300 focus:outline-none focus:border-2 focus:border-purple-400 text-gray-900 shadow-md transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="w-full">
              <p className="text-md md:text-md ml-2 mb-1">
                Password <sup className="text-red-500">*</sup>
              </p>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={changeHandler}
                required
                className="p-4 rounded-lg text-sm md:text-base w-full border border-gray-300 focus:outline-none focus:border-2 focus:border-purple-400 text-gray-900 shadow-md transition-all duration-300 ease-in-out"
              />
            </label>
            <label className="w-full">
              <p className="text-md md:text-md ml-2 mb-1">
                Confirm Password <sup className="text-red-500">*</sup>
              </p>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={changeHandler}
                required
                className="p-4 rounded-lg text-sm md:text-base w-full border border-gray-300 focus:outline-none focus:border-2 focus:border-purple-400 text-gray-900 shadow-md transition-all duration-300 ease-in-out"
              />
            </label>
            <div className='flex justify-center mt-7'>
              <button
                type="submit"
                className="p-4 w-44 bg-purple-500 text-white rounded-xl font-semibold text-lg hover:bg-purple-600 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Verify Email
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] flex justify-center items-center p-2 m-4">
          <img
            src={LoginIMG}
            alt="Signup illustration"
            className="w-[85%] h-auto rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
