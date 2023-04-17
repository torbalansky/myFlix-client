import React from "react";
import { Button, Col, Row, Figure, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './fav-movies.scss'


function FavoriteMovies({ favoriteMovieList }) {
    const removeFav = (id) => {
        let token = localStorage.getItem('token');
    let url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
    fetch(url, {
      method: "DELETE",
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
  };

    return (
        <Card>
             <Card.Body>   
                <Row>
                    <Col xs={12}>
                        <h2>Favorite Movies</h2>
                    </Col>
                    {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
                        return (
                            <Col xs={12} md={6} lg={3} key={_id} className="fav-movies">
                                <Figure>
                                <Link to={`/movies/${_id}`}>
                                        <Figure.Image
                                            src={ImagePath}
                                            alt={Title}
                                        />
                                        <Figure.Caption>
                                            {Title}
                                        </Figure.Caption>
                                    </Link>
                                </Figure>
                                <Button variant="secondary" onClick={() => removeFav(movie._id)}>
                                    Remove from list
                                </Button>
                            </Col>
                        )
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default FavoriteMovies;
