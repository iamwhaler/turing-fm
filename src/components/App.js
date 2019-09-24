import React, {Component} from 'react';
import '../assets/styles/main.scss';
import { Orchestrator } from "./Orchestrator";
import { Dropdown } from "./Dropdown";
import { getDefaultState } from "../core/default_state.js";

import { Gin } from "../core/Gin";
import Helpers from "../core/Helpers";
import { rules } from "../core/rules";
import { airport } from "../knowledge/piano_notes";
import $ from "jquery";
import CSlider from "./Controls";
import { soundManager } from "soundmanager2";
import Tone from "tone";
import _ from "lodash";
import {SolarSystemsList} from "./solar_system/SolarSystemsList";
import {SolarSystemsManager} from "./solar_system/SolarSystemManager";



class App extends Component {
  constructor(props) {
    super(props);

    this.gin = new Gin("Generative", getDefaultState);
    this.gin.init();
    this.gin.registerRules(rules);
    this.gin.newGame();
    this.state = {
      fetched_sequence: [],
      sequence: [],
      current: "prototype"
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
    this.gin.setState({
      initDone: true,
      fetched_sequence: []
    });
    this.helpers.requestSequence(this.gin);
    //this.helpers.drawCanvas();

    var note = _.sample(airport);



    //var synth = new Tone.FatOscillator(note.note + note.octave, "sine", 40).toMaster().start();

      setInterval(function() {
          note = _.sample(airport);
      }, 1000);

      soundManager.setup({
        url: '/path/to/swf-directory/',
        onready: function() {
          console.log("SM2 has loaded");
        },

        ontimeout: function() {
          console.log("Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue\n")
        }

      });
  }


  render() {
    let content = (() => {
      if (this.state.current === "prototype") {
        return (
            <div className="app-content">
              {/* <canvas className="canvas" width="1050" height="700"></canvas> */}
              <h3 className="instructions">Each click generates sound (just wait for some notes to appear in the sequence table before clicking)</h3>
              {/* <CSlider value={this.gin.store.orchestrator.playback_rate} onChange={e => this.helpers.changePlaybackRate(this.state, e)} gin={this.gin} /> */}
              {!this.gin.store.game_paused ?
                  (<div className="flex-container-row" style={{ height: "100%", justifyContent: "space-around"}}>
                    <div className="controls">
                      <div>{"Time: " + this.gin.store.frame}</div>
                      <div>{"BPM: " + this.gin.store.frame_rate * 100}</div>
                    </div>
                    <div className="flex-container-column">
                      {this.gin.store.fetched_sequence.length > 0  ? <Orchestrator fetched={false} state={this.state} gin={this.gin} /> : <div className="lds-dual-ring"></div>}
                    </div>
                  </div>) : <div><button className="btn btn-sequence" onClick={() => this.gin.playGame()}>Generate</button></div>}
            </div>
        )
      } else if (this.state.current === "solar_system") {
        return <SolarSystemsManager gin={this.gin} />
      }
    })();

    return (
      
        <div className="App">
          <Dropdown/>
          <button onClick={() => { this.setState({ current: "prototype" })}}>Prototype</button>
          <button onClick={() => { this.setState({ current: "solar_system" })}}>Solar system</button>
          {content}
        </div>
    );
  }
}

export default App;
