import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  const { movieId } = useParams();
  const currentMovie = movie.find(m => m.id === movieId);
  return (
    <Row>
        <Col>
            <div className="movie-view">
              <div className="movie-poster">
            <img src={currentMovie.image} />
          </div>
          <div>
            <span>Title: </span>
            <span className="movie-title">{currentMovie.title}</span>
          </div>
          <div>
          <br />
            <span>Description: </span>
            <span>{currentMovie.description}</span>
          </div>
          <br />
          <div>
            <span>Stars: </span>
            <span>{currentMovie.stars.join(', ')}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{currentMovie.genre}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{currentMovie.director}</span>
          </div>
          <Link to={`/`}>
          <br />
          <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer"}}>Back</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};
