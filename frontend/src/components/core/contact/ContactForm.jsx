import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

import laptopimg from '../../../assets/images/login.jpg';

import toast from 'react-hot-toast';
import { apiConnector } from '../../../services/apiconnector';
import { states } from '../../../data/state';
import { contactusEndpoint } from '../../../services/apis';
import ContactDetails from './ContactDetails';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const toastId = toast.loading("Loading...");
      const formattedData = {
        email: data.email,
        firstname: data.firstName, 
        lastname: data.lastName, 
        message: data.message,
        phoneNo: data.phoneNo, 
        state: data.state,
        subject: data.subject,
      };

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formattedData
      );
      setLoading(false);
      toast.dismiss(toastId);
      toast.success(res.data.message || "Message sent successfully!");
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message);
      toast.error("Failed to send the message. Try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "", 
        lastName: "", 
        message: "",
        phoneNo: "",
        subject: "",
        state: "", 
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50  to-indigo-50 max-w-4xl mx-auto p-8 border-2 mt-5 rounded-lg shadow-lg mb-3 ">
      <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center mb-8 text-gray-600">
        Have a question or need help with your order? Feel free to reach out to us by filling out the form below, and we’ll get back to you as soon as possible.
      </p>
      <div className="md:flex gap-10 mb-5">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-[60%]" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="first-name">First Name <span className='text-red-500'>*</span></label>
            <input className="w-full p-2 border border-gray-300 rounded" id="first-name" type="text" {...register('firstName', { required: true })} />
          </div>
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="last-name">Last Name <span className='text-red-500'>*</span></label>
            <input className="w-full p-2 border border-gray-300 rounded" id="last-name" type="text" {...register('lastName', { required: true })} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium" htmlFor="email">Email Address <span className='text-red-500'>*</span></label>
            <input className="w-full p-2 border border-gray-300 rounded" id="email" type="email" {...register('email', { required: true })} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium" htmlFor="phone">Phone Number (Optional)</label>
            <input className="w-full p-2 border border-gray-300 rounded" id="phone" type="tel" {...register('phoneNo')} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium" htmlFor="state">State<span className='text-red-500'>*</span></label>
            <select className="w-full p-2 border border-gray-300 rounded mt-4" id="state" {...register('state', { required: true })}>
              {states.map((state, id) => (
                <option key={id} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium" htmlFor="subject">Subject (Optional)</label>
            <input className="w-full p-2 border border-gray-300 rounded" id="subject" type="text" {...register('subject')} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium" htmlFor="message">Message</label>
            <textarea className="w-full p-2 border border-gray-300 rounded" id="message" rows="4" placeholder="Enter Your Message Here.." {...register('message')}></textarea>
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className={`bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 hover:scale-95 ${loading ? "opacity-50" : ""}`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        <div className="mt-8 md:w-[50%]">
        <ContactDetails/>
          <div className="mt-4">
            <img src={laptopimg} alt="Contact Us" className='rounded' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
