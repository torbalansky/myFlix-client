import React, { useEffect, useState } from "react";
import axios from "axios";

function UserInfo() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`;

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
      <p>User: {user && user.Username}</p>
      <p>e-mail: {user && user.Email}</p>
    </>
  );
}

export default UserInfo;
