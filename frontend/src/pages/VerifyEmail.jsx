import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { verifyEmailAndSignup } from '../services/operations/authAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = signupData;
    try {
      await verifyEmailAndSignup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate,
        otp,
        dispatch
      );
    } catch (error) {
      console.log(error.message);
      toast.error('SIGNUP FAILED');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white p-6 lg:p-10 m-4 rounded-lg shadow-lg w-full max-w-[500px]">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Verify Your Email</h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          A 6-digit OTP has been sent to your email{' '}
          <span className="font-medium text-gray-800">{signupData.email}</span>. Please enter it below to verify your email.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                }}
                className="w-[50px] lg:w-[60px] p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-lg text-center  focus:outline-2 focus:outline-blue-400"
              />
            )}
            containerStyle={{
              justifyContent: 'space-between',
              gap: '0 6px',
            }}
          />
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 transition duration-200 py-3 rounded-md text-white font-semibold text-lg"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
