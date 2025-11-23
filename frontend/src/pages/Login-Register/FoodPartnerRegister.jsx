import React, { useState } from "react";
import {
  Building,
  Lock,
  Mail,
  MapPin,
  Briefcase,
  User,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const FoodPartnerRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/food-partner/register`,
        { email, password, phone, name, address, contactName },
        { withCredentials: true }
      );
      navigate("/create-food");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm dark:bg-gray-800 dark:text-white transition duration-200 placeholder-gray-500 dark:placeholder-gray-400";
  const focusClasses = "focus:ring-pink-500 focus:border-pink-500";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 transition duration-300 border border-gray-200 dark:border-gray-700">
        {/* Navigation Switcher */}
        <div className="flex justify-center mb-10 bg-gray-200/70 dark:bg-gray-700/70 rounded-full p-1 shadow-inner">
          <Link
            to="/user/register"
            className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition duration-200 text-center"
          >
            Normal User Register
          </Link>
          <button
            className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-pink-600 text-white shadow-md transition duration-200 transform hover:scale-[1.01]"
            aria-current="page"
          >
            Food Partner Register
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <Building className="w-12 h-12 mx-auto text-pink-600 dark:text-pink-400" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
            Join as a Partner
          </h1>
          <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
            Register your business to start contributing resources.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name Field */}
          <div className="relative">
            <label className="sr-only">Business Name</label>
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Business Name"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Contact Name Field (New) */}
          <div className="relative">
            <label className="sr-only">Contact Name</label>
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Contact Name"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Phone Number Field (New) */}
          <div className="relative">
            <label className="sr-only">Phone Number</label>
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number (e.g., 555-123-4567)"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Business Street Address Field (New) */}
          <div className="relative">
            <label className="sr-only">Business Street Address</label>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Business Street Address"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Email Address Field */}
          <div className="relative">
            <label className="sr-only">Business Email Address</label>
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Business Email Address"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="sr-only">Set Password</label>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set Password"
              className={`${inputClasses} ${focusClasses}`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 mt-8 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-900 transition duration-200 transform active:scale-95"
          >
            <Building className="w-5 h-5 mr-2" />
            Complete Partner Registration
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Already registered?
            <Link
              to="/food-partner/login"
              className="font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 ml-1"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
