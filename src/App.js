import React, {Component} from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import _ from "lodash";
import { getDefaultState } from "./knowledge/default_state.js";

import { Gin } from "./knowledge/Gin";
import Helpers from "./knowledge/Helpers";
import { rules } from "./knowledge/rules";
import $ from "jquery";


const _ENDPOINT_URL = "https://small-gm-api.herokuapp.com/sequence";

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

    this.gin.params.helpers.requestSequence(_ENDPOINT_URL, this.gin);

    if (!this.state.game_paused) this.gin.playGame();
    this.gin.playGame();
  }


  render() {
    console.log(this.gin.store);
    return (
        <div className="App">
          <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
          <h3 className="instructions">Each click generates sound</h3>

          <div className="flex-container-row" style={{ height: "100%", justifyContent: "space-around"}}>
            <div className="flex-container-column">
              <h4 className="text-center">Algorithm 1</h4>
              <Orchestrator fetched={false} state={this.state} gin={this.gin} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
