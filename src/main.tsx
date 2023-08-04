import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store/reduxStore.ts";
import LandingPage from "./components/LandingPage/LandingPage.tsx";
import GameScreen from "./components/GameScreen/GameScreen.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GameScreen />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);
