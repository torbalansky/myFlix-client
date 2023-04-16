import React, { useEffect, useState } from "react";
import axios from "axios";

function UserInfo() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user");
      const url = `https://torbalansk-myflix-app.herokuapp.com/users/${userId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    };

    getUserInfo();
  }, []);

  return (
    <>
      <h4>Your info</h4>
      <p>User: {user.Username}</p>
      <p>e-mail: {user.Email}</p>
    </>
  );
}

export default UserInfo;
