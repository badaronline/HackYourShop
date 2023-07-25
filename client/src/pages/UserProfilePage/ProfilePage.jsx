import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import "./profilePage.css";

const ProfilePage = () => {
  const { userToken } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (name.length === 0 && password.length === 0) {
      setError("Please enter Name or Password to update");
      return;
    } else if (
      (name.length > 0 && password.length === 0) ||
      (name.length >= 0 && password.length > 8)
    ) {
      setError("");
    } else if (name.length >= 0 && password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    try {
      const port = process.env.BASE_SERVER_URL;
      const response = await axios.put(
        `${port}/api/profile`,
        { name, password },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      const { message } = response.data;
      setError(message);

      // Clear input fields
      setName("");
      setPassword("");
    } catch (error) {
      const { data } = error.response;
      setError(data.error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Update Information</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter new Name"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new Password"
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
