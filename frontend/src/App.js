import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  UploadPodcast,
  PodcastById,
} from "./Routes.js";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/create" element={<UploadPodcast />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/details/:id' element={<PodcastById />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
          </Routes>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
