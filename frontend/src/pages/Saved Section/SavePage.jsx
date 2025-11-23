import React from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SavePage = () => {
  const [videos, setVideos] = useState([]);

  const handleVideoClick = (item) => {
    window.location.href = `/save/${item._id}`;
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.API_URL}/api/food/save`, {
        withCredentials: true,
      })
      .then((response) => {
        const savedFood = (response.data.savedFood || []).map((item) => ({
          _id: item.food._id,
          video: item.food.video,
        }));
        setVideos(savedFood);
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center overflow-hidden">
      {/* MOBILE FRAME CONTAINER */}
      <div
        className="
          relative 
          w-[380px]     
          h-[800px]     
          bg-black 
          rounded-[2.5rem] 
          overflow-hidden 
          border-4 border-gray-800 
          shadow-2xl 
          flex flex-col
        "
      >
        {/* INNER CONTENT (scrollable area) */}
        <div className="flex-1 overflow-y-auto no-scrollbar text-white pb-20">
          {/* HEADER */}
          <div className="w-full py-4 text-center bg-black border-b border-gray-800 sticky top-0 z-10">
            <h1 className="text-lg font-semibold">Saved Reels</h1>
          </div>

          {videos.length === 0 ? (
            <div className="w-full text-center py-10 text-gray-400">
              No saved videos found
            </div>
          ) : (
            // {/* SAVED REELS GRID */}
            <div className="grid grid-cols-3 gap-1 p-3 ">
              {videos.map((item) => (
                <div
                  key={item._id}
                  className="
                  aspect-9/16 
                  bg-gray-900 
                  rounded-md 
                  overflow-hidden 
                  relative 
                  group 
                  cursor-pointer
                "
                >
                  <video
                    src={item.video}
                    onClick={() => handleVideoClick(item)}
                    muted
                    className="
                    w-full h-full object-cover 
                    transition-all duration-300 
                    group-hover:scale-110 border border-gray-200
                  "
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default SavePage;
