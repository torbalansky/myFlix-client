import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

import "./index.scss";
/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered main component.
 */
const App = () => {
  return (
  <Container fluid className="custom-container">
    <MainView />
  </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
