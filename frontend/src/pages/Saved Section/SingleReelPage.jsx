import axios from "axios";
import { ArrowLeft, Bookmark, Heart, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BottomNav from "../../components/BottomNav";
import { toast } from "react-hot-toast";
import { FcLike } from "react-icons/fc";

const SingleReelPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  //play video
  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play().catch(() => {});
    }
  }, [video]);

  // -------------  single Video Saved Logic ----------------
  useEffect(() => {
    const fetchReel = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save/${id}`,
        {
          withCredentials: true,
        }
      );
      setVideo(res.data.savedFood.food);
    };
    fetchReel();
  }, [id]);

  if (!video) return <div className="text-white">Loading...</div>;

  //------------------handleClick on Like -------------------
  const handleLike = async (video) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/like`,
        { foodId: video._id },
        { withCredentials: true }
      );
      setVideo((prev) => ({
        ...prev,
        likeCount: response.data.like ? prev.likeCount + 1 : prev.likeCount - 1,
      }));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //------------------handleClick on Save -------------------
  const handleSave = async (video) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/save`,
        { foodId: video._id },
        { withCredentials: true }
      );

      setVideo((prev) => ({
        ...prev,
        saveCount: response.data.save ? prev.saveCount + 1 : prev.saveCount - 1,
      }));

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
            {video && (
              <div
                key={video._id}
                className="relative w-full h-[800px] snap-start flex items-center justify-center"
              >
                {/* Video */}
                <video
                  src={video.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(90%)" }}
                  muted
                  loop
                  playsInline
                />

                {/* BACK BUTTON */}
                <button
                  onClick={() => navigate(-1)}
                  className="cursor-pointer absolute top-5 left-5 z-50 
                  text-white p-2 bg-black/40 rounded-full 
                 backdrop-blur-md border border-white/20"
                >
                  <ArrowLeft size={22} />
                </button>

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"></div>

                {/* Bottom Content */}
                <div className="absolute bottom-20 w-full px-4 flex justify-between items-end">
                  {/* LEFT SIDE */}
                  <div className="text-white w-[70%]">
                    <h1 className="text-xl font-semibold mb-2">{video.name}</h1>

                    <p className="text-sm opacity-90 mb-3 line-clamp-2">
                      {video.description}
                    </p>

                    <button
                      onClick={() =>
                        navigate("/food-partner/" + video.foodPartner)
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
                        {video.likeCount ? (
                          <FcLike size={22} onClick={() => handleLike(video)} />
                        ) : (
                          <Heart size={22} onClick={() => handleLike(video)} />
                        )}
                      </div>
                      <span className="text-xs mt-1">
                        {video.likeCount || 0}
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
                        <Bookmark size={22} onClick={() => handleSave(video)} />
                      </div>
                      <span className="text-xs mt-1">
                        {video.saveCount || 0}
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
                      <span className="text-xs mt-1">
                        {video.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default SingleReelPage;
