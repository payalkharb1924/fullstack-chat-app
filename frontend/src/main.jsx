import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// BrowserRouter is a component from the react-router-dom library used for client-side routing in React applications. It enables you to create single-page applications (SPAs) with multiple views without requiring a full page reload.
// What does BrowserRouter do?
// It keeps the UI in sync with the URL.
// It uses the HTML5 History API (e.g., pushState, replaceState) to change the URL and navigate between routes without refreshing the page.
// It wraps your app and provides routing capabilities like <Route>, <Link>, <Navigate>, etc.
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
