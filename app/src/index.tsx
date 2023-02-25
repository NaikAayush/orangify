import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/fonts/RogerexBlack.ttf";
import "./assets/fonts/RogerexBold.ttf";
import "./assets/fonts/RogerexExtraBold.ttf";
import "./assets/fonts/RogerexMax.ttf";
import "./assets/fonts/RogerexMedium.ttf";
import "./assets/fonts/RogerexRegular.ttf";
import "./assets/fonts/RogerexSemiBold.ttf";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
