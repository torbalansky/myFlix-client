import React, { useEffect, useState } from "react";

function UserInfo({username, email}) {

  return (
    <>
      <h3>Your info</h3>
      <p>Username: {username}</p>
      <p>E-mail: {email}</p>
    </>
  );
}

export default UserInfo;
