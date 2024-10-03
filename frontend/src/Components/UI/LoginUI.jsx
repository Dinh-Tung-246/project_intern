import React from "react";
import { Toaster } from "react-hot-toast";
import { FaLock, FaUser } from "react-icons/fa";

const LoginUI = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">
          Login
          <Toaster />
        </button>
      </form>
    </div>
  );
};

export default LoginUI;
