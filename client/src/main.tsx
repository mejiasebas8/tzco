import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles beyond Tailwind
import React from "react";

const styles = document.createElement("style");
styles.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

  body {
    font-family: 'Courier Prime', monospace;
    background-color: #000000;
    color: #F8F6F0;
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
