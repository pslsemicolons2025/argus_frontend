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
  const [selectedScan, setSelectedScan] = useState(undefined);
  const setScan = (scan) => {
    setSelectedScan(scan);
  };
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={
            <HomePageComponent
              setProject={(project) => setProject(project)}
              setScan={(scan) => setScan(scan)}
            />
          }
        />
        <Route
          path="/report"
          element={
            <ResultsPageComponent
              selectedProject={selectedProject}
              selectedScan={selectedScan}
            />
          }
        />
        <Route
          path="/history"
          element={
            <HistoryPageComponent
              selectedProject={selectedProject}
              setScan={(scan) => setScan(scan)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
