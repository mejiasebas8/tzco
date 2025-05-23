import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles beyond Tailwind
import React from "react";

const styles = document.createElement("style");
styles.innerHTML = `
  body {
    font-family: 'Arial', sans-serif;
    background-color: #F8F6F0;
    color: #2D2D2D;
    overflow: hidden;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
document.head.appendChild(styles);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
