import React from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator"

function App() {
  return (
    <div className="App">
      <div className="flex-container-row">
        <Orchestrator />
        <Orchestrator timeout={500} />
      </div>
    </div>
  );
}

export default App;
