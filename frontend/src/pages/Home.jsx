import axios from "axios";
import { Bookmark, Heart, MessageCircle, Plus, TrendingUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import BottomNav from "../components/BottomNav";
import { toast } from "react-hot-toast";
import { FcLike } from "react-icons/fc";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [role, setRole] = useState("");
  const videoRefs = useRef(new Map());
  const observerRef = useRef(null);
  const navigate = useNavigate();

  // -------------------- Video AutoPlay Logic --------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {
              /* ignore autoplay errors */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [videos]);

  // -------------------- Fetch Videos / role --------------------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/food`, {
        withCredentials: true,
      })
      .then((response) => {
        setVideos(response.data.foodItems);
        setRole(response.data.role);
      });
  }, []);

  // -------------------- Video AutoPlay Cleanup --------------------
  useEffect(() => {
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observerRef.current.unobserve(video);
      });
    };
  }, []);

  //------------------handleClick on Like -------------------
  const handleLike = async (item) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );
      if (response.data.like) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
          )
        );
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //------------------handleClick on Save -------------------
  const handleSave = async (item) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.save) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v
          )
        );
      } else {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v
          )
        );
      }

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleComment = () => {
    toast("Comment Feature Comming Soon", {
      icon: "👏",
    });
  };

  const handlePlusClick = () => {
    if (role === "partner") {
      navigate("/create-food");
    } else {
      navigate("/food-partner/login");
    }
  };

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center overflow-hidden">
      {/* MOBILE FRAME CONTAINER */}
      <div
        className="
          relative 
          w-[380px]               /* width of mobile frame */
          h-[800px]               /* height of mobile frame */
          bg-black 
          rounded-[2.5rem] 
          overflow-hidden 
          border-4 border-gray-800 
          shadow-2xl 
          flex 
          justify-center 
          items-center
        "
      >
        {/* CONTENT INSIDE MOBILE FRAME */}
        <div className="w-full h-full overflow-hidden relative">
          {/* MOBILE SCROLL CONTENT */}
          <div className="snap-y snap-mandatory h-full overflow-scroll no-scrollbar">
            {videos.map((item) => (
              <div
                key={item._id}
                className="relative w-full h-[800px] snap-start flex items-center justify-center"
              >
                {/* Video */}
                <video
                  ref={setVideoRef(item._id)}
                  src={item.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(90%)" }}
                  muted
                  loop
                  playsInline
                />

                {/* top ka messgae ya sign */}
                <div className="absolute top-2 left-0 right-0 p-4 text-white z-20">
                  <h1 className="text-lg font-bold flex items-center text-shadow">
                    <TrendingUp size={24} className="mr-2 text-green-400" />
                    Food Shorts
                  </h1>
                </div>

                {/* add video ka button */}
                <div className="absolute top-2 left-0 right-0 p-4 text-white z-20">
                  <div
                    onClick={handlePlusClick}
                    className="w-10 h-10 
                          rounded-full 
                          backdrop-blur-xl 
                          bg-white/15 
                          border border-white/20 
                          flex justify-center items-center
                          hover:scale-110 hover:bg-white/25
                          transition-all float-right"
                  >
                    <Plus size={24} className="cursor-pointer text-white" />
                  </div>
                </div>

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"></div>

                {/* Bottom Content */}
                <div className="absolute bottom-20 w-full px-4 flex justify-between items-end">
                  {/* LEFT SIDE */}
                  <div className="text-white w-[70%]">
                    <h1 className="text-xl font-semibold mb-2">{item.name}</h1>

                    <p className="text-sm opacity-90 mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <button
                      onClick={() =>
                        navigate("/food-partner/" + item.foodPartner)
                      }
                      className="bg-blue-600 px-5 py-2 rounded-full text-white font-medium active:scale-95"
                    >
                      Visit Store
                    </button>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col items-center text-white space-y-6 pb-5 pr-1">
                    {/* LIKE BUTTON */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10
                          rounded-full 
                          backdrop-blur-xl 
                          bg-white/15 
                          border border-white/20 
                          flex justify-center items-center
                          hover:scale-110 hover:bg-white/25
                          transition-all"
                      >
                        {item.likeCount ? (
                          <FcLike size={22} onClick={() => handleLike(item)} />
                        ) : (
                          <Heart size={22} onClick={() => handleLike(item)} />
                        )}
                      </div>
                      <span className="text-xs mt-1">
                        {item.likeCount || 0}
                      </span>
                    </div>

                    {/* BOOKMARK BUTTON */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10
                          rounded-full 
                          backdrop-blur-xl 
                          bg-white/15 
                          border border-white/20 
                          flex justify-center items-center
                          hover:scale-110 hover:bg-white/25
                          transition-all"
                      >
                        <Bookmark size={22} onClick={() => handleSave(item)} />
                      </div>
                      <span className="text-xs mt-1">
                        {item.saveCount || 0}
                      </span>
                    </div>

                    {/* COMMENTS BUTTON */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10
                          rounded-full 
                          backdrop-blur-xl 
                          bg-white/15 
                          border border-white/20 
                          flex justify-center items-center
                          hover:scale-110 hover:bg-white/25
                          transition-all"
                      >
                        <MessageCircle size={22} onClick={handleComment} />
                      </div>
                      <span className="text-xs mt-1">{item.comments || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
