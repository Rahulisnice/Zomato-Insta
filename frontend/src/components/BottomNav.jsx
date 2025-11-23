import axios from "axios";
import { BookmarkCheck, Home, Settings } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function BottomNav() {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "text-blue-500" : "text-gray-200";

  const handleLogout = () => {
    try {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        )
        .then(() => navigate("/user/login"));
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {/* BOTTOM NAVBAR */}
      <div className="absolute bottom-0 w-full bg-black/40 border-t border-white/20 py-2 flex justify-around text-white">
        <div
          onClick={() => navigate("/")}
          className={`cursor-pointer flex flex-col items-center ${isActive(
            "/"
          )}`}
        >
          <Home size={28} />
          <p className="text-[10px]">home</p>
        </div>

        <div
          onClick={() => navigate("/saved")}
          className={`cursor-pointer flex flex-col items-center ${isActive(
            "/saved"
          )}`}
        >
          <BookmarkCheck size={28} />
          <p className="text-[10px]">saved</p>
        </div>

        <div
          onClick={() => setOpenSettings(true)}
          className="cursor-pointer text-gray-200 flex flex-col items-center"
        >
          <Settings size={28} />
          <p className="text-[10px] text-gray-200">settings</p>
        </div>
      </div>

      {/* SETTINGS POPUP */}
      {openSettings && (
        <div className="absolute inset-0 bg-black/70 flex justify-center items-center px-6">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-center">Settings</h2>

            <button
              onClick={handleLogout}
              className="cursor-pointer w-full bg-red-600 text-white py-2 rounded-lg mb-3 font-semibold"
            >
              Logout
            </button>

            <button
              onClick={() => navigate("/food-partner/login")}
              className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              Login as Food Partner
            </button>

            <p
              onClick={() => setOpenSettings(false)}
              className="text-center mt-5 text-sm text-gray-600 cursor-pointer hover:underline"
            >
              Cancel
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default BottomNav;
