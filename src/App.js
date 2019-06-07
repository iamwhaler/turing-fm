import React from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator"

function App() {
  return (
    <div className="App">
      <div className="flex-container-row">
      <Orchestrator />
      <Orchestrator timeout={200} rate={0.5}/>
      </div>
    </div>
  );
}

export default App;
