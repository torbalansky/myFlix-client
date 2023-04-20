import { useState, useEffect } from "react";
import { Card, Col, Button, Row, Figure, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";

export function ProfileView({ user, token, onLoggedOut, movies, updateUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  
    const favoriteMovies = user && user.FavoriteMovies
      ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id))
      : [];
  
    const handleUpdate = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case "username":
          setUsername(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "email":
          setEmail(value);
          break;
        default:
          break;
      }
    };
  
    const updateCurrentUser = (data) => {
      if (!user || !user.Username) {
        alert("User is not defined.");
        return;
      }
  
      if (!data.username || !data.password || !data.email) {
        alert("Please enter a valid username, password, and email address.");
        return;
      }
  
      fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Changing userdata failed");
            return false;
          }
        })
        .then((updatedUser) => {
          if (updatedUser) {
            alert("Successfully changed userdata");
            updateUser(updatedUser);
          }
        })
        .catch((e) => {
          alert(e);
        });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        username,
        password,
        email
      };
  
      updateCurrentUser(data);
    };
  
    const removeFavorite = (movie) => {
      fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            const updatedUser = { ...user, FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movie._id) };
            updateUser(updatedUser);
          } else {
            alert("Failed to remove favorite movie");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const deleteAccount = () => {
      fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) {
            alert("Your account has been deleted. Goodbye!");
            onLoggedOut();
          } else {
            alert("Could not delete account");
          }
        })
        .catch((e) => {
          alert(e);
        });
    };
    
    useEffect(() => {
      if (user) {
        updateCurrentUser(user);
      }
    }, [user]);

  return (
    <>
    <Row>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h4>Manage your account</h4>
            <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                name="username"
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
                name="password"
                defaultValue={user && user.Password}
                onChange={handleUpdate}
                required
                placeholder="Your password must be minimum 8 characters"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label style={{ margin: "20px", marginTop: "10px" }}>E-mail address:</Form.Label>
                <Form.Control
                type="email"
                name="email"
                defaultValue={user && user.Email}
                onChange={handleUpdate}
                required
                placeholder="Enter your e-mail"
                />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => updateCurrentUser({ username, password, email })}>Update</Button>
            </Form>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm("Are you sure?")) {
                  deleteAccount();
                }
              }}
            >
              Delete user account
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <div style={{ padding: "0 20px" }}>
    <Card>
        <Card.Body>
          <Row>
            <Col xs={12}>
              <h2>Favorite Movies</h2>
            </Col>
            {favoriteMovies.map(({ ImagePath, Title, _id }) => {
              return (
                <Col xs={12} md={6} lg={3} key={_id} className="fav-movies">
                  <Figure>
                    <Link to={`/movies/${_id}`}>
                      <Figure.Image src={ImagePath} alt={Title} />
                      <Figure.Caption>{Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (confirm("Are you sure?")) {
                        removeFavorite({
                          id: _id,
                        });
                      }
                    }}
                  >
                    Remove from Favorites
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};
