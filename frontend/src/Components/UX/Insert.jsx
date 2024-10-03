import React, { useState } from "react";
import "../Css/Insert.css";
import { fetchDataInsert } from "../ConstApi/ConstApi";
import InsertUI from "../UI/InsertUI";
import toast from "react-hot-toast";

const Insert = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    role: {
      id: "",
    },
  });
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("tokenType");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Bạn cần nhập lại đúng mật khẩu!!!");
    } else {
      try {
        const data = await fetchDataInsert(tokenType, token, formData);
        const error_code = data.err_cd;
        const msg = data.err_msg;
        const message = data.error_message;
        if (error_code === "000") {
          toast.success(msg);
          setTimeout(() => {
            window.location.href = "/list";
          }, 1000);
        } else {
          if (message === null || message === undefined || message === "") {
            sessionStorage.setItem("error", msg);
          } else {
            sessionStorage.setItem("error", message);
          }
          toast.error(sessionStorage.getItem("error"));
        }
      } catch (error) {
        console.error("Error fetching insert data: ", error);
      }
    }
  };

  return (
    <div>
      <InsertUI
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Insert;
