import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';

import "./update-user.scss"

function UpdateUser ({handleSubmit, user}) {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
  
    const handleUpdate = (e) => {
      const { name, value } = e.target;
      setUpdatedUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const updateUser = () => {
        try {
          let token = localStorage.getItem('token');
          let url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`;
          fetch(url, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
        }
        catch (err) {
          console.log(err);
        }
      };
    
      const deleteUser = () => {
        try {
          let token = localStorage.getItem('token');
          let url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            history.push('/');
          })
          .catch(error => {
            console.log(error);
          });
        }
        catch (err) {
          console.log(err);
        }
      };
    
      const confirmDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          deleteUser();
        }
      };


  return (
    <>
    <h3>Manage your account</h3>
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          defaultValue={user && user.Username}
          onChange={e => handleUpdate(e)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="Password"
          defaultValue={user && user.Password}
          onChange={e => handleUpdate(e)}
          required
          placeholder="Your password must be minimum 8 charactes"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label style={{ margin: "20px", marginTop: "10px" }}>E-mail address:</Form.Label>
        <input
        type="email"
        name="Email"
        defaultValue={user && user.Email}
        onChange={handleUpdate}
        required
        placeholder="Enter your e-mail"
/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={updateUser}> Update </Button>

      <Button variant="danger" onClick={deleteUser} style={{ marginLeft: "10px", float: "right" }}> Delete account </Button>
    </Form>
    </>
  );
}

export default UpdateUser;
