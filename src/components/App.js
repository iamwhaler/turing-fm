import React, {Component} from 'react';
import '../assets/styles/main.scss';
import { Dropdown } from "./Dropdown";
import { getDefaultState } from "../core/default_state.js";

import { Gin } from "../core/Gin";
import Helpers from "../core/Helpers";
import { rules } from "../core/rules";
import Tone from "tone";
import _ from "lodash";
import {SolarSystemsList} from "./solar_system/SolarSystemsList";
import {SolarSystemsManager} from "./solar_system/SolarSystemManager";

import { Chord, Note, Distance } from 'tonal';
import samples from '../knowledge/samples.json';

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

    Tone.context.latencyHint = 'playback';
    Tone.Transport.start();
  }

  componentDidMount() {
    this.gin.setState({
      initDone: true,
      fetched_sequence: []
    });

      // soundManager.setup({
      //   url: '/path/to/swf-directory/',
      //   onready: function() {
      //     console.log("SM2 has loaded");
      //   },
      //
      //   ontimeout: function() {
      //     console.log("Uh-oh. No HTML5 support, SWF missing, Flash blocked or other issue\n")
      //   }
      //
      // });

    let store = this.gin.store;
    let helpers = this.helpers;
    document.addEventListener('planet_created', function (e) {
      var loop = _.sample(store.fetched_sequence);
      try {
        helpers.createLoop( loop.note + loop.octave, loop.file )
      } catch(e) {}
    }, false);
  }


  render() {
    let content = (() => {
      if (this.state.current === "prototype") {
        return (
            <div className="app-content">
              {!this.gin.store.game_paused ?
                  (<div className="flex-container-row" style={{ height: "100%", justifyContent: "space-around"}}>
                    <div className="controls">
                      <select defaultValue="chord_progression">
                        <option value="graph">Graph</option>
                        <option value="chord_progression">Chord Progression</option>
                        <option value="orchestrator">Orchestrator</option>
                        <option value="chords">Chords</option>
                      </select>
                      <div>{"Time: " + this.gin.store.frame}</div>
                      <div>{"BPM: " + this.gin.store.frame_rate * 100}</div>

                      <div className="paths">
                        {_.map(this.gin.store.fetched_sequence, (item, key) => {
                        return (
                            <div key={key} className={this.gin.store.tick === item.time ? "current-note " : ""}>
                              <div>{item.note + item.octave  + " " + " t: " + item.time}</div>
                            </div>)
                      })}
                      </div>

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
          <button onClick={() => { console.log(this.gin.store)}}>Console state</button>
          <button onClick={() => { this.setState({ current: "prototype" })}}>Prototype</button>
          <button onClick={() => { this.setState({ current: "solar_system" })}}>Solar system</button>
          {content}
        </div>
    );
  }
}

export default App;
