//index.jsx
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <HashRouter>
      <MainView />
    </HashRouter>
  );

};


// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);