import React from "react";

import ReactDOM from "react-dom/client";

import { LenraApp } from '@lenra/client';

import App from "./App";

import "./index.css";

if(window.location.pathname === "/redirect.html") {
  window.opener.postMessage(window.location.href, `${window.location.protocol}//${window.location.host}`);
}

const app = new LenraApp({
  appName: "Example Client",
  clientId: "XXX-XXX-XXX",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

// If app var is defined, show App class, else show Login class
root.render(
  <React.StrictMode>
    <App app={app}/>
  </React.StrictMode>
);
