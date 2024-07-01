
# myFlix-client

myFlix-client is a client-side application built using React that allows users to browse a list of movies and view detailed information about each movie. This project is part of the myFlix project and provides an interactive interface for users to explore various movies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/myFlix-client.git
    ```

2. Navigate to the project directory:

    ```bash
    cd myFlix-client
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. (Optional) Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables.

## Usage

To start the development server:

```bash
npm start
```

Open your browser and go to:

```text
http://localhost:3000
```

You should see the main view with a list of movie cards. Click on any movie card to view detailed information about the movie.

## Project Structure

The project is structured as follows:

```
myFlix-client/
├── public/
├── src/
│   ├── components/
│   │   ├── MainView/
│   │   │   └── MainView.jsx
│   │   ├── MovieCard/
│   │   │   └── MovieCard.jsx
│   │   ├── MovieView/
│   │   │   └── MovieView.jsx
│   │   │── LoginView/
│   │   │   └──LoginView.jsx
│   │   ├──SignupView
│   │   │   └── SignupView.jsx
│   │   ├── ProfileView
│   │   │   └──ProfileView.jsx
│   │   ├──NavigationBar
│   │   │   └──NavigationBar.jsx
│   ├── index.js
│   ├── App.js
├── package.json
├── README.md
```

## Components

### MainView

The `MainView` component manages the main view of the application. It maintains the state of the movie list and renders `MovieCard` components.

**File:** `src/components/MainView/MainView.jsx`

### MovieCard

The `MovieCard` component displays the title and poster of a movie. When clicked, it triggers a function to show detailed information about the movie.

**File:** `src/components/MovieCard/MovieCard.jsx`

### MovieView

The `MovieView` component displays detailed information about a selected movie, including its title, director, and poster image. It also includes a back button to return to the main view.

**File:** `src/components/MovieView/MovieView.jsx`

### LoginView

Log In: Allows users to log in with a username and password.

### SignupView

Sign Up: Allows new users to register with a username, password, email, and date of birth.

### ProfileView

User Details: Displays user registration details.
Update Info: Allows users to update their information (username, password, email, date of birth).
Favorite Movies: Displays the user's favorite movies.
Remove Favorite: Allows users to remove a movie from their list of favorite movies.
Deregister: Allows existing users to deregister from the application.

## Features

- **Browse Movies**: View a list of movie cards with titles and posters.
- **View Movie Details**: Click on a movie card to see detailed information about the movie.
- **Navigate Back**: Use the back button in the detailed view to return to the main movie list.

## Contributing

To contribute to this project:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature-branch
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m "Add some feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature-branch
    ```

5. Open a pull request.
