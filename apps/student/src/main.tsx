import React from "react";
import { createRoot } from "react-dom/client";
import "@spark-stack/design-tokens/tokens.css";
import "@spark-stack/ui/styles.css";
import "./app.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root was not found.");

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);