import { useState, useEffect } from "react";
import { Card, Row, Container, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import UserInfo from './user-info'
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import './profile-view.scss';
import axios from "axios";

export function ProfileView ({movies, OnUpdateUserInfo}) {
    const [user, setUser] = useState({}); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");

    const favoriteMovieList = user && user.FavoriteMovies ? movies.filter(movie => user.FavoriteMovies.includes(movie._id)) : [];

    const getUser = async () => {
        try {
          const response = await axios.get(`https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setUser(response.data);
        } catch (e) {
          console.log(e);
        }
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
            Username: user.Username,
            Password: user.Password,
            Email: user.Email,
            Birthday: user.Birthday
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          OnUpdateUserInfo(response.data);
          alert('User updated successfully');
        } catch (e) {
          console.log(e);
        }
      };
      

      const removeFav = async (id) => {
        try {
          const response = await axios.delete(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/favorites/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setUser(response.data);
          alert('Movie removed from favorites');
        } catch (e) {
          console.log(e);
        }
      };
      

    const handleUpdate = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                        <UserInfo name= {user.username} email= {user.Email} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />
        </Container>
    );
}
