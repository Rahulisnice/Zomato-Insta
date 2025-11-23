import React, { useState } from "react";
import { LogIn, User, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm dark:bg-gray-800 dark:text-white transition duration-200 placeholder-gray-500 dark:placeholder-gray-400";
  const focusClasses = "focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 transition duration-300 border border-gray-200 dark:border-gray-700">
        {/* Navigation Switcher */}
        <div className="flex justify-center mb-10 bg-gray-200/70 dark:bg-gray-700/70 rounded-full p-1 shadow-inner">
          <button
            className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white shadow-md transition duration-200 transform hover:scale-[1.01]"
            aria-current="page"
          >
            Normal User Login
          </button>
          <Link
            to="/food-partner/login"
            className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition duration-200 text-center"
          >
            Food Partner Login
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <User className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
            Welcome Back
          </h1>
          <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
            Sign in to your user account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Address Field */}
          <div className="relative">
            <label className="sr-only">Email Address</label>
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              required
              value={email}
              placeholder="Email Address"
              className={`${inputClasses} ${focusClasses}`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="sr-only">Password</label>
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="password"
              required
              value={password}
              placeholder="Password"
              className={`${inputClasses} ${focusClasses}`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 mt-8 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition duration-200 transform active:scale-95"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link
              to="/user/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 ml-1"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
