import React from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      {_.each([1,2,3,4,5], (item, key) => {
        return <div className="flex-container-column key"  style={{ position: "relative", height: "100%", width: "100%"}} key={key}></div>
      })}
      <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
      <div className="flex-container-row" style={{ position: "absolute", height: "100%" }}>
        <Orchestrator />
        <Orchestrator />
        <Orchestrator />
      </div>
    </div>
  );
}

export default App;
