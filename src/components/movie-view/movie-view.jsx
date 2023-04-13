import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <Row>
        <Col>
        <div className="movie-view">
          <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer"}}>Back</Button>
      </div>
      </Col>
      </Row>
    );
  };
  