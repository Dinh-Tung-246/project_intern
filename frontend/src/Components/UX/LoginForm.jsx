import React, { useState } from "react";
import "../Css/LoginForm.css";
import Menu from "./Menu";
import { fetchDataLogin } from "../ConstApi/ConstApi";
import LoginUI from "../UI/LoginUI";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchDataLogin(username, password);
      sessionStorage.setItem("token", data.jwt_token);
      sessionStorage.setItem("tokenType", data.token_type);
      sessionStorage.setItem("error_success", data.err_msg);
      if (data.err_cd === "000") {
        toast.success(sessionStorage.getItem("error_success"), {
          position: "top-center",
        });
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 1500);
      } else {
        toast.error(sessionStorage.getItem("error_success"), {
          position: "top-center",
        });
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching data login: ", error);
    }
  };

  if (IsLoggedIn) {
    return <Menu />;
  }

  return (
    <div>
      <LoginUI
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default LoginForm;
