import React from "react";
import { Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

function UpdateUser ({handleSubmit, handleUpdate, user}) {
  const updateUser = async () => {
    try {
      let token = localStorage.getItem('token');
      let url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`;
      const response = await axios.put(url, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <h4>Update</h4>
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
        <Form.Label>Email address:</Form.Label>
        <input
          type="email"
          name="Email"
          defaultValue={user && user.Email}
          onChange={e => handleUpdate({ ...user, Email: e.target.value})}
          required
          placeholder="Enter your e-mail"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={updateUser}> Update </Button>
    </Form>
    </>
  );
}

export default UpdateUser;
