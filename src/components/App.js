import React, {Component} from 'react';
import '../assets/styles/main.scss';
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
  }

  componentDidMount() {
    this.gin.setState({
      initDone: true,
      fetched_sequence: []
    });

    const violinsSamples = samples['vsco2-cello-spic']["1"];

      const findClosest = note => {
      const noteMidi = Note.midi(note);
      const maxInterval = 96;
      let interval = 0;
      while (interval <= maxInterval) {
        const higherNote = Note.fromMidi(noteMidi + interval);
        if (violinsSamples[higherNote]) {
          return higherNote;
        }
        const lowerNote = Note.fromMidi(noteMidi - interval);
        if (violinsSamples[lowerNote]) {
          return lowerNote;
        }
        interval += 1;
      }
      return note;
    };

    Promise.all(
        Reflect.ownKeys(violinsSamples).map(
            note =>
                new Promise(resolve => {
                  const buffer = new Tone.Buffer(violinsSamples[note], () => {
                        resolve(buffer)
                      }
                  );
                })
        )
    ).then(buffers => {
      const violinsBuffers = Reflect.ownKeys(violinsSamples).reduce(
          (buffersByKey, note, i) => {
            buffersByKey[note] = buffers[i];
            return buffersByKey;
          },
          {}
      );
      const playNote = note => {
        const closestSample = findClosest(note);
        const difference = Distance.semitones(note, closestSample);
        const buffer = violinsBuffers[closestSample];
        const bufferSource = new Tone.BufferSource(buffer).toMaster();
        const playbackRate = Tone.intervalToFrequencyRatio(-24 + difference);
        bufferSource.set({ playbackRate });
        bufferSource.start();
      };
      const notes = Chord.notes('C2', 'm7');
      notes.forEach(playNote);

      // playRandom();
      // setInterval(() => {
      //   playRandom();
      // }, 30000);
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
  }


  render() {
    let content = (() => {
      if (this.state.current === "prototype") {
        return (
            <div className="app-content">
              {/* <canvas className="canvas" width="1050" height="700"></canvas> */}
              {/* <CSlider value={this.gin.store.orchestrator.playback_rate} onChange={e => this.helpers.changePlaybackRate(this.state, e)} gin={this.gin} /> */}
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
