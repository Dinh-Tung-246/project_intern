import React, { useState } from "react";
import "../Css/Update.css";
import { fetchDataUpdate } from "../ConstApi/ConstApi";
import UpdateUI from "../UI/UpdateUI";
import toast from "react-hot-toast";

const Update = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("tokenType");
  const id = sessionStorage.getItem("userId");
  const [username, setUsername] = useState(sessionStorage.getItem("userName"));
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      if (selectedOption === "option1") {
        setPassword("");
        const data = await fetchDataUpdate(
          tokenType,
          token,
          id,
          username,
          password
        );
        const msg = data.err_msg;
        const message = data.error_message;
        if (data.err_cd === "000") {
          sessionStorage.setItem("error", msg);
          toast.success(sessionStorage.getItem("error"));
          setTimeout(() => {
            window.location.href = "/list";
          }, 1000);
        } else if (
          message === null ||
          message === undefined ||
          message === ""
        ) {
          sessionStorage.setItem("error", msg);
          toast.error(sessionStorage.getItem("error"));
        } else {
          sessionStorage.setItem("error", message);
          toast.error(sessionStorage.getItem("error"));
        }
      }
      if (selectedOption === "option2") {
        if (
          password.trim() === null ||
          password.trim() === "" ||
          password.trim() === undefined
        ) {
          toast.error("Vui lòng nhập mật khẩu mới !!!");
        } else if (password !== passwordConfirm) {
          toast.error("Bạn cần nhập lại đúng mật khẩu xác nhận !!!");
        } else {
          const data = await fetchDataUpdate(
            tokenType,
            token,
            id,
            username,
            password
          );
          const msg = data.err_msg;
          const message = data.error_message;
          if (data.err_cd === "000") {
            sessionStorage.setItem("error", msg);
            toast.success(sessionStorage.getItem("error"));
            setTimeout(() => {
              window.location.href = "/list";
            }, 1000);
          } else if (
            message === null ||
            message === undefined ||
            message === ""
          ) {
            sessionStorage.setItem("error", msg);
            toast.error(sessionStorage.getItem("error"));
          } else {
            sessionStorage.setItem("error", message);
            toast.error(sessionStorage.getItem("error"));
          }
        }
      }
    } catch (error) {
      console.error("ERROR fetching update data: ", error);
    }
  };

  return (
    <div>
      <UpdateUI
        handleSubmitUpdate={handleSubmitUpdate}
        username={username}
        setUsername={setUsername}
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
        password={password}
        setPassword={setPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
      />
    </div>
  );
};

export default Update;
