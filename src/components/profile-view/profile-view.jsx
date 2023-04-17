import { useState, useEffect } from "react";
import { Card, Row, Container, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import UserInfo from './user-info'
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import './profile-view.scss';


export function ProfileView ({movies, OnUpdateUserInfo}) {
    const [user, setUser] = useState({}); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");

    const favoriteMovieList = user && user.FavoriteMovies ? movies.filter(movie => user.FavoriteMovies.includes(movie._id)) : [];

    const getUser = () => {
        fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to retrieve user data');
            }
        })
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify({
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update user data');
            }
        })
        .then(data => {
            OnUpdateUserInfo(data);
            alert('User updated successfully');
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        getUser();
    }, []);

    const removeFav = (id) => {
        fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to remove movie from favorites');
            }
        })
        .then(data => {
            setUser(data);
            alert('Movie removed from favorites');
        })
        .catch(error => {
            console.log(error);
        });
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