import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./pages/App/App.js";
import MessagePage from "./pages/MessagePage/MessagePage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <script src="/socket.io/socket.io.js"></script>
    		<script src="/Users/andrewhuang/Projects/project-3/src/pages/App/App.js"></script>
        <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
