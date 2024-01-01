import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("email")
    navigate("/");
  }


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
        
      </div>
    </nav>
  );
};

export default Header;
