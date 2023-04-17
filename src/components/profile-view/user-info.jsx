import React, { useEffect, useState } from "react";

function UserInfo() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`;

      fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to retrieve user data");
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };


    getUserInfo();
  }, []);

  return (
    <>
      <h4>Your info</h4>
      <p>Username: {user && user.Username}</p>
      <p>E-mail: {user && user.Email}</p>
    </>
  );
}

export default UserInfo;
