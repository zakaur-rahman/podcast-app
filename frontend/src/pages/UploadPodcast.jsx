import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
  file: "",
  author: "",
  speaker: "",
  type: "",
};

const UploadPodcast = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.title);
  };

  /* const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }; */

  /*  useEffect(() => {
    const getFile = async () => {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      try {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          const response = await axios.post(
            `${server}/file-handle`,
            data,
            config
          );
          values.url = response.data;
          console.log(values.url);
        }
      } catch (e) {}
    };
    getFile();
  }, [file]);
 */

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        values.file = reader.result;
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" }, //multipart/form-data
    };
    console.log(values);
    await axios
      .post(`${server}/upload-podcast`, values, config)
      .then((res) => {
        console.log(res);
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 space-x-8 items-center flex-auto relative justify-center">
        <div className="border-b border-gray-900/10 p-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Upload Your Podcast.
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
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
                    rows={3}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the podcast.
              </p>
            </div>

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
                        onChange={handleFileInputChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
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
                Choose a Category:
              </label>
              <select
                name="type"
                id={values.type}
                onChange={(e) => handleInputChange(e)}
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <option value="">Select...</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
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
    </form>
  );
};

export default UploadPodcast;
