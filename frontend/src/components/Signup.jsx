import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles.js";
import { Link } from "react-router-dom";
import { API } from "../service/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: ""
};

const Signup = () => {
  const [values, setValues] = useState(initialValues);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
     
        let response = await API.userSignup(values);
        if (response.isSuccess) {
          setValues(initialValues)
          alert("Please check your email for verification.");
          navigate('/login')
        }
    } catch (err) {
      
      console.log("error:", err.msg);
      toast.error(`${err.msg}`)
    }
  };
  


  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "password" : "text"}
                  name="password"
                  autoComplete="password"
                  required
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
        
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700  "
              >
                Sign Up
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
