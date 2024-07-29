import React from "react";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Welcome to Bus Booking</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Your Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
          <a href="#" className="float-right">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn btn-success">
          Log In
        </button>
        <div className="link">
          <span>
            Don't have any Account? <a href="#">Sign Up</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
