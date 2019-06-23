import React, {Component} from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import { Dropdown } from "./components/Dropdown";
import { getDefaultState } from "./knowledge/default_state.js";

import { Gin } from "./knowledge/Gin";
import Helpers from "./knowledge/Helpers";
import { rules } from "./knowledge/rules";
import $ from "jquery";


class App extends Component {
  constructor(props) {
    super(props);

    this.gin = new Gin("Generative", getDefaultState);
    this.gin.init();
    this.gin.registerRules(rules);
    this.gin.newGame();
    this.state = {
      fetched_sequence: [],
      sequence: []
    };

    this.helpers = new Helpers(this.gin);

    this.gin.addViewHandler(state => {
      console.log("set state " + state.tick);
      this.setState(state);
    });
    //this.gin.connectReact(this);
    this.gin.initLoop();
    this.state.initDone = false;
    this.gin.params["helpers"] = this.helpers;

  }

  componentDidMount() {
    console.log("componentDidMount");

    this.gin.setState({
      initDone: true,
      fetched_sequence: []
    });
    if (!this.state.game_paused) this.gin.playGame();
    this.gin.playGame();
    this.helpers.requestSequence(this.gin);
    this.helpers.drawCanvas();
  }


  render() {
    return (
      
        <div className="App">
          {<Dropdown/>}
          <div className="app-content">
            <canvas className="canvas" width="1050" height="700"></canvas>
            <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
            <h3 className="instructions">Each click generates sound (just wait for some notes to appear in the sequence table before clicking)</h3>
            <h3 className="instructions">The playback should start by itself in a couple seconds</h3>
            <div className="flex-container-row" style={{ height: "100%", justifyContent: "space-around"}}>
              <div className="flex-container-column">
                {this.gin.store.fetched_sequence.length > 0  ? <Orchestrator fetched={false} state={this.state} gin={this.gin} /> : <div className="lds-dual-ring"></div>}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
