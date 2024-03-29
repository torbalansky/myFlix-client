## myFlix-client

### Objective

The objective of this project is to build a client-side movie app using React as the front-end and a REST API as the back-end.

### Built with

- React
- React Bootstrap
- Redux
- JavaScript
- HTML
- CSS/SCSS

myFlix is hosted on Netlify. Click the link below to access the app:

[Visit myFlix on Netlify](https://myflix-torbalansky.netlify.app/)

### Features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it's featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., "Thriller")
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister
- JWT token-based user authentication

### Views

- Main view: Returns a list of ALL movies to the user (each listed item with an image and title), sorting and filtering, and the ability to select a movie for more details
- Single movie view: Returns data (description, genre, director, image) about a single movie to the user and allows users to add/remove a movie to their list of favorites
- Login view: Allows users to log in with a username and password
- Signup view: Allows new users to register (username, password, email, birthday)
- Genre view: Returns data about a genre, with a name and description, and displays example movies
- Director view: Returns data about a director (name, bio, birth year, death year), and displays example movies
- Profile view: Allows users to update their user info (username, password, email), allows existing users to deregister, displays favorite movies, and allows users to remove a movie from their list of favorites

### API Endpoints

The myFlix app uses a REST API with the following endpoints:

*Movies*

GET /movies - Returns a list of all movies
GET /movies/:title - Returns data (description, genre, director, image URL, whether it's featured or not) about a single movie by title
GET /movies/genres/:name - Returns data about a genre (description) by name/title
GET /movies/directors/:name - Returns data about a director (bio, birth year, death year) by name
Users

POST /users - Allows new users to register
GET /users/:username - Returns data about a user (username, email, date of birth)
PUT /users/:username - Allows users to update their user info (username, password, email, date of birth)
POST /users/:username/movies/:movieID - Allows users to add a movie to their list of favorites
DELETE /users/:username/movies/:movieID - Allows users to remove a movie from their list of favorites
DELETE /users/:username - Allows existing users to deregister
Authentication
