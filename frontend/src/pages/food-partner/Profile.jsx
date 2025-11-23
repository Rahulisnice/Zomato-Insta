import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import image from "../../assets/avatar.webp";

const Profile = () => {
  const { id } = useParams();
  const [profile, setprofile] = useState(null);
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/food/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setprofile(res.data.foodPartner);
        setvideos(res.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center overflow-hidden">
      {/* MOBILE FRAME (same as previous page) */}
      <div
        className="
          relative 
          w-[380px]           
          h-[800px]           
          bg-white 
          rounded-[2.5rem] 
          overflow-hidden 
          border-4 border-gray-700 
          shadow-2xl
        "
      >
        {/* REAL PAGE CONTENT (unchanged) */}
        <div className="min-h-full bg-gray-100 dark:bg-gray-900 overflow-y-scroll no-scrollbar">
          {/* HEADER */}
          <div className="p-5 border-b bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-lg font-semibold">Business Profile</h1>
          </div>

          {/* PROFILE SECTION */}
          <div className="p-5">
            {/* TOP SECTION */}
            <div className="flex items-center gap-4">
              <img
                className="w-[120px] h-[120px] max-[900px]:w-[24] max-[900px]:h-[24] max-[420px]:w-[72px] max-[420px]:h-[72px] rounded-full object-cover bg-gray-100 border-2 border-gray-300 dark:border-gray-600"
                src={image}
                alt="avatar"
              />
              <div className="flex flex-col flex-1">
                <p className="text-lg font-semibold text-white">
                  {profile?.name}
                </p>
                <p className="text-sm text-gray-300">{profile?.address}</p>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm text-center">
                <p className="text-xs text-gray-600">Total Meals</p>
                <p className="text-xl font-bold text-gray-800">
                  {profile?.totalMeals}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm text-center">
                <p className="text-xs text-gray-600">Customers Served</p>
                <p className="text-xl font-bold text-gray-800">
                  {profile?.customersServed}
                </p>
              </div>
            </div>
          </div>

          {/* VIDEOS */}
          <div className="px-5 pt-3">
            <p className="font-semibold text-white">Videos</p>
          </div>

          <div className="p-5 h-105 overflow-y-scroll no-scrollbar grid grid-cols-3 gap-2">
            {videos.map((v) => (
              <div
                key={v._id}
                className="border-white border rounded-xl h-48 flex items-center justify-center text-gray-600 text-sm"
              >
                <video
                  className="w-full h-full rounded-xl object-cover bg-gray-200 dark:bg-gray-800"
                  src={v.video}
                  muted
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
