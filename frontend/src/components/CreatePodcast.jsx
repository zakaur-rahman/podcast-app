import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../service/firebase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { DataContext } from "../context/DataProvider";
import { server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

const initialValues = {
  title: "",
  description: "",
  fileUrl: "",
  email: "",
  speaker: "",
  categories: "",
  type: "",
  createdDate: new Date(),
};

const UploadPodcast = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialValues);
  const { account } = useContext(DataContext);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    file && uploadFile(file, "fileUrl");
  }, [file]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "video" ? "videos/" : "audio/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          post.fileUrl = downloadURL;
          console.log("DownloadURL - ", post.fileUrl);
          setFilePerc(0);
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    try {
      post.categories = location.search?.split("=")[1] || "All";
      post.email = account.email;
      await axios.post(`${server}/create`, post, config).then((res) => {
        console.log(res);
        setPost(initialValues);
        alert("Uploaded..");
        navigate("/");
      });
    } catch (err) {
      toast.error(`${err.message}`);
      console.log("error:", err);
    }
  };

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => handleUpload(e)}
      className=" rounded-md shadow-sm ring-1 ring-inset ring-gray-300 space-y-12 space-x-8 items-center flex-col relative justify-center"
    >
      <div className="border-b border-gray-900/10 p-12 flex-col items-center justify-center">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Upload Your Podcast.
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="col-span-full">
          <label
            htmlFor="file"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Podcast File
          </label>
          <div className="mt-2 ">
            <div className=" rounded-md flex-col text-justify justify-items-center shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-1 flex justify-center align-middle text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file"
                  className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="video/*, audio*"
                    onChange={(e) => setFile((prev) => e.target.files[0])}
                    className="sr-only"
                  />
                </label>{" "}
                {filePerc > 0 && "Uploading: " + filePerc + "%"}
                <p className="pl-1">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Podcast Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter the podcast name..."
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Write a few sentences about the podcast."
                  rows={3}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Speaker Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="speaker"
                  id="speaker"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter the Speaker name..."
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="type"
              className=" text-sm font-medium leading-6 text-gray-900"
            >
              Choose File Type:
            </label>
            <select
              name="type"
              id={post.type}
              onChange={(e) => handleInputChange(e)}
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <option value="">Select...</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadPodcast;
