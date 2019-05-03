import React from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator"

function App() {
  return (
    <div className="App">
      <code className="flex-container-row">
      <Orchestrator />
      <Orchestrator timeout={2} rate={0.5}/>
      </code>
    </div>
  );
}

export default App;
