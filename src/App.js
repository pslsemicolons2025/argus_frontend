import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageComponent from "./Components/HomePageComponent/HomePageComponent";
import ResultsPageComponent from "./Components/ResultsPageComponent/ResultsPageComponent";
import NavbarComponent from "../src/Components/NavBarComponent/NavBarComponent";
import HistoryPageComponent from "./Components/HistoryPageComponent/HistoryPageComponent";
import "./App.css";

function App() {
  const [selectedProject, setSelectedProject] = useState(undefined);
  const setProject = (project) => {
    setSelectedProject(project);
  };
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={
            <HomePageComponent setProject={(project) => setProject(project)} />
          }
        />
        <Route
          path="/report"
          element={<ResultsPageComponent selectedProject={selectedProject} />}
        />
        <Route
          path="/history"
          element={<HistoryPageComponent selectedProject={selectedProject} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
