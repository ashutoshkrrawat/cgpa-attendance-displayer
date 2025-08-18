import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ResultProvider } from "./Context/ResultContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

    <ResultProvider>
      <App />
    </ResultProvider>

    </BrowserRouter>
  </React.StrictMode>
);
