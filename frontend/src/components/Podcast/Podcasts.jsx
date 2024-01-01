import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { API } from "../../service/api";
import Podcast from "./podcast";
import { Triangle } from 'react-loader-spinner'

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await API.getAllPosts({
          category: categoryParam || "",
        });
        if (response.isSuccess) {
          setPodcasts(response.data);
        }
      } catch (error) {
        console.log(error.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryParam]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredPodcasts = podcasts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === "all") {
      return titleMatch;
    } else {
      return titleMatch && post.type === selectedCategory;
    }
  });

  return (
    <div className="pt-4">
      <div className="flex justify-end px-8 py-2 text-black no-underline items-end col-span-full">
        <div className="flex items-center bg-white rounded-full border border-blue">
          <FaSearch className="ml-2 h-7 w-6 text-gray-500" />
          <input
            className="h-10 pl-2 pr-8 rounded-r-full text-md hover:bg-gray-200 text-black ml-1 cursor-pointer transition duration-300 hover:placeholder:text-gray-600 hover:text-black"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e)}
            placeholder="Enter podcast name.."
            type="text"
          />
        </div>
        <div className="ml-4 border bg-white rounded-full p-1">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e)}
            className="rounded p-1"
          >
            <option value="all">All Types</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Triangle />
        </div>
      ) : (
        <div className="flex flex-wrap">
          {filteredPodcasts.length ? (
            filteredPodcasts.map((post) => (
              <div key={post._id} className="lg:w-1/4 sm:w-1/2 xs:w-full p-1">
                <Link to={`details/${post._id}`} className="no-underline text-black">
                  <Podcast post={post} />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-lg mx-auto mt-8">
              {searchTerm.toLowerCase() === ""
                ? "No data is available for the selected category."
                : "No matching results found."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Podcasts;
