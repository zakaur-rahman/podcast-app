import React, { useState, useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
//import { API } from "../service/api.js";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider.js";
import axios from "axios";
import { server } from "../server.js";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const { setAccount } = useContext(DataContext);
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "application/json",
     },
    };
    try {
      await axios.post(`${server}/login`, values, config).then((res) => {
        console.log(res);
        toast.success(res.data.message);
        if (res.status === 200) {
          sessionStorage.setItem(
            "accessToken",
            `Bearer ${res.data.accessToken}`
          );
          sessionStorage.setItem(
            "refreshToken",
            `Bearer ${res.data.refreshToken}`
          );
          setAccount({
            name: res.data.name,
            email: res.data.email,
          });

          setValues(initialValues);
          navigate("/");
        }
      });
    } catch (err) {
      toast.error(err.message);
      console.log('Error: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={loginUser}>
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
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me.
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700  "
              >
                Log In
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have an account?</h4>
              <Link to="/signup" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
