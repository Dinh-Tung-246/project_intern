import React from "react";
import { Button, Nav } from "react-bootstrap";
import "../Css/Menu.css";
import { fetchLogout } from "../ConstApi/ConstApi";
import toast, { Toaster } from "react-hot-toast";

const Menu = () => {
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("tokenType");

  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchLogout(tokenType, token);
      toast.success(data.err_msg);
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Error fetching logout: ", error);
    }
  };

  return (
    <div className="menu">
      <Nav defaultActiveKey="" as="ul">
        <h1>Welcome to my app !!!</h1>
        <Nav.Item as="li">
          <Nav.Link href="/menu">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/list">List User</Nav.Link>
        </Nav.Item>
        <Button variant="primary" onClick={handleClickLogout}>
          Log Out
          <Toaster />
        </Button>
      </Nav>
    </div>
  );
};

export default Menu;
