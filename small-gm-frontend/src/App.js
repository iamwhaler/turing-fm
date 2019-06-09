import React, {Component} from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import _ from "lodash";
import { getDefaultState } from "./knowledge/default_state.js";

import { Gin } from "./knowledge/Gin";
import Helpers from "./knowledge/Helpers";
import { rules } from "./knowledge/rules";


class App extends Component {

  constructor(props) {
    super(props);

    this.gin = new Gin("Generative", getDefaultState);
    this.gin.init();
    this.gin.registerRules(rules);
    this.state = this.gin.store;

    this.helpers = new Helpers(this.gin);

    this.gin.addViewHandler(state => {
      console.log("set state " + state.tick);
      this.setState(state);
    });
    //this.gin.connectReact(this);

    this.state.initDone = false;

    this.gin.params["helpers"] = this.helpers;


  }

  componentDidMount() {
    console.log("componentDidMount");

    this.gin.setState({
      stage: "menu",
      initDone: true
    });
    // if (!this.state.game_paused) this.gin.playGame();
    //this.gin.playGame();
  }


  render() {
    return (
        <div className="App">
          <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
          <h3 className="instructions">Each click generates sound</h3>
          <div className="flex-container-row" style={{position: "absolute", height: "100%"}}>
            <Orchestrator state={this.state} gin={this.gin} />
            <Orchestrator state={this.state} gin={this.gin} />
          </div>
        </div>
    );
  }
}

export default App;
