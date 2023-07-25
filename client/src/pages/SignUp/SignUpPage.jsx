import React, { useState } from "react";
import "./signUp.css";
import axios from "axios";

const SignUpPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.name === "") {
      alert("Please Input your Name");
      return;
    }

    // Perform email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Invalid email address");
      return;
    }

    if (user.password.length < 8) {
      alert("Password should be at least 8 characters");
      return;
    }

    if (user.password !== user.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const port = process.env.BASE_SERVER_URL;
      const res = await axios.post(`${port}/api/signup`, user);
      alert(res.data.message);
      window.location.replace("/login");
    } catch (err) {
      // console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1> Create an account</h1>
        <form>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="repeatPassword"
            value={user.repeatPassword}
            placeholder="Repeat Password"
            onChange={handleChange}
            required
          />
          <div className="remember-forgot">
            {/* <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label> */}
            <button type="button" onClick={handleSubmit}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
