import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./loginPage.css";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    userToken && window.location.replace("/");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/products/shop" } };

  const handleLogin = async () => {
    try {
      const port = process.env.BASE_SERVER_URL;
      const res = await axios.post(`${port}/api/login`, user);
      const token = res.data.token;
      login(token);
      navigate(from);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <form>
          <p>Login with email</p>
          <div className="input-container">
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
          </div>
          {/* <div className="remember-forgot">
            <label>
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
            <p className="forgot-password">Forgot Password?</p>
          </div> */}
          <div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
        <div className="signup-link">
          <Link to="/signup">
            <p>Or create an account</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
