import React, { useState, useRef } from "react";
import { CloudUpload, ChessRook, Club, BowArrow } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreateFood = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
  });

  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video") {
      const file = files[0];
      setForm((prev) => ({ ...prev, video: file }));

      if (file) {
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(URL.createObjectURL(file));
      } else {
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(null);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("video", form.video);

    try {
      const response = await axios.post(
        `${import.meta.env.API_URL}/api/food`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setVideoPreviewUrl(null);
    setForm((prev) => ({ ...prev, video: null }));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);

      setForm((prev) => ({ ...prev, video: file }));
      setVideoPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Invalid file type. Please upload a valid video file.");
    }
  };

  return (
    <div
      className="
        w-full min-h-screen flex justify-center items-center bg-black
        overflow-hidden no-scrollbar
      "
      style={{ padding: 0, margin: 0 }}
    >
      {/* MOBILE CONTAINER */}
      <div
        className="
          w-[380px] h-[800px] bg-gray-900 rounded-[40px] shadow-2xl 
          border border-gray-700 overflow-y-auto no-scrollbar 
          p-4
        "
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <BowArrow className="w-10 h-10 mx-auto text-indigo-500" />
          <h1 className="text-2xl font-extrabold text-gray-100 mt-3">
            Create New Food
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Share your culinary masterpiece!
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-300 flex items-center"
            >
              <ChessRook className="w-4 h-4 mr-2 text-gray-400" />
              Food Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="E.g., Shahi Paneer"
              required
              className="
                px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 
                text-gray-100 placeholder-gray-500 focus:ring-2 
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-300 flex items-center"
            >
              <Club className="w-4 h-4 mr-2 text-gray-400" />
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your recipe..."
              required
              className="
                px-4 py-3 border border-gray-700 rounded-lg 
                bg-gray-700 text-gray-100 resize-none placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500
              "
            ></textarea>
          </div>

          {/* Video Upload */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="video"
              className="text-sm font-medium text-gray-300 flex items-center"
            >
              <CloudUpload className="w-4 h-4 mr-2 text-gray-400" />
              Upload Video
            </label>

            {videoPreviewUrl ? (
              <div className="relative w-full rounded-lg overflow-hidden border border-indigo-600">
                <video src={videoPreviewUrl} controls className="w-full" />
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="
                    absolute top-2 right-2 p-1 bg-black bg-opacity-50 
                    text-white rounded-full
                  "
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                className="
                  mt-1 flex justify-center px-6 pt-5 pb-6 border-2 
                  border-gray-700 border-dashed rounded-lg cursor-pointer 
                  hover:border-indigo-500 transition
                "
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center space-y-1">
                  <CloudUpload className="mx-auto h-12 w-12 text-gray-500" />
                  <label
                    htmlFor="video"
                    className="cursor-pointer text-indigo-500 text-sm"
                  >
                    Upload a file
                  </label>
                  <input
                    ref={fileInputRef}
                    id="video"
                    name="video"
                    type="file"
                    className="sr-only"
                    accept="video/*"
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">or drag & drop</p>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg bg-indigo-500 text-white text-lg 
              font-semibold hover:bg-indigo-600 transition
            "
          >
            Publish Video
          </button>
        </form>
      </div>

      <style>{`
        /* Hide all scrollbars */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CreateFood;
