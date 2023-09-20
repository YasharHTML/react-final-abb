import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const Upload = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const username = useSelector((state: RootState) => state.auth.username);

  
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setUploadFile(selectedFile); 

     
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const imgData = uploadFile;
    if (imgData) {
      const imgURL = URL.createObjectURL(imgData);
      const postData = {
        imageUrl: imgURL,
        location: location || '',
        caption: caption || '',
      };
      if (caption && caption.trim() !== "") {
        postData.caption = caption;
      }
      if (location && location.trim() !== "") {
        postData.location = location;
      }
      try {
        await dispatch(addPost(postData) as any);
        navigate(`/profile/${username}`)
        console.log("uploaded");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto">
        <div className="py-5 ">
          <form onSubmit={handleUpload}>
            <div className="mb-4 flex text-3xl ">
              <label
                htmlFor="file-input"
                className="text-black flex bg-transparent rounded cursor-pointer mr-2"
              >
                <BsUpload />
                <span className="text-2xl ml-4">Choose File</span>
              </label>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="caption"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                caption (optional)
              </label>
              <input
                type="text"
                id="caption"
                name="caption"
                autoComplete="false"
                placeholder="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                location (optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                autoComplete="false"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            {uploadFile ? (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(uploadFile)}
                  alt=""
                  className="max-w-full w-72 h-72 object-cover"
                />
              </div>
            ) : (
              ""
            )}

            <button className="hover:bg-blue-600  focus:bg-blue-600 bg-blue-500 text-white mt-3 py-2 px-4 rounded-full focus:outline-none">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
