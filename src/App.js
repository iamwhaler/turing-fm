import React from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
      <div className="flex-container-row">
        <Orchestrator />
      </div>
    </div>
  );
}

export default App;
