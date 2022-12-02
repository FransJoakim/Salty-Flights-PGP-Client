import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/Caricatura.ttf";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
