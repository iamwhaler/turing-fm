import React, {Component} from 'react';
import './App.css';
import { Orchestrator } from "./components/Orchestrator";
import _ from "lodash";
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
    this.state = {
      fetched_sequence: []
    };

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

    this.requestSequence(this.state, "http://floating-tor-22631.herokuapp.com/sequence");
    // if (!this.state.game_paused) this.gin.playGame();
    //this.gin.playGame();
  }


  requestSequence(state, url, callback) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XMLHttpRequest;

    var xhr = new XHR();

    xhr.open('GET', "https://cors-anywhere.herokuapp.com/" + url, true); // proxy chaining

    xhr.onload = function() {
      state.fetched_sequence.push(JSON.parse(this.responseText));
    };

    xhr.headers = {
      'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
    };

    xhr.send();
  };



  render() {
    setInterval(console.log(this.state), 1000);
    return (
        <div className="App">
          <h3 className="instructions">Playback rate is controlled by the position of your cursor</h3>
          <h3 className="instructions">Each click generates sound</h3>
          <div className="flex-container-row" style={{position: "absolute", height: "100%"}}>
            <Orchestrator state={this.state} gin={this.gin} />
            <Orchestrator state={this.state} gin={this.gin} />
            <button onClick={() => {    this.requestSequence('floating-tor-22631.herokuapp.com/sequence')}}>AAA</button>
          </div>
        </div>
    );
  }
}

export default App;
