import { Button, Row, Col } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row>
        <Col>
          <div className="movie-view">
            <div className="movie-poster">
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span className="movie-title">{movie.title}</span>
        </div>
        <div>
        <br />
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <br />
        <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer"}}>Back</Button>
      </div>
      </Col>
    </Row>
  );
};
