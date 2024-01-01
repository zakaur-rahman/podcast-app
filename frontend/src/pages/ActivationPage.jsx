import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../service/api";
const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await API.activateAccount({
            activation_token
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Somthing went wrong Try again.</p>
      ) : (
        <div>
          <h1>Account is activated</h1>
          <button
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
