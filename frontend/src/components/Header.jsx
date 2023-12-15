import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("email")
    navigate("/");
  }

  const [podcast, setPodcast] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  


  const getPodcast = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api-weather-m8vk.onrender.com/weather/?location=${server}`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getPodcast();
    }
  };

  return (
    <nav className="bg-blue-500 text-black">
      <div className="container mx-auto flex justify-center">
        
        <Link to="/" className="px-4 py-2 text-white no-underline">
          HOME
        </Link>
        <Link to="/" className="px-4 py-2 text-white no-underline">
          ABOUT
        </Link>
        <Link to="/login" className="px-4 py-2 text-white no-underline">
          LOGIN
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white no-underline"
          onClick={logout}
        >
          LOGOUT
        </Link>
        <div className="px-4 py-2 text-black no-underline">
          <input className="btn pl-2 text-md rounded-full border border-white border-opacity-80 bg-opacity-10 text-black ml-1 cursor-pointer  transition duration-300 hover:bg-opacity-0 hover:bg-gray-100 hover:text-white"
            value={podcast}
            onChange={(event) => setPodcast(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter podcast name.."
            type="text"
          />
          <button
            className="btn  text-md rounded-full border border-white border-opacity-80 bg-opacity-10 text-white ml-1 cursor-pointer  transition duration-300 hover:bg-opacity-20 hover:bg-gray-500 hover:text-black"
            onClick={getPodcast}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
