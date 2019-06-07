import React from 'react';
import ReactDOM from 'react-dom';
import notes, { airport, airport_progressions } from "../knowledge/piano_notes"
import _ from "lodash";
import Sound from "react-sound";


const NOTE_BANK = ["A", "C", "D#", "F#"];


export class Orchestrator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      single_notes: [],
      text_sequence: "",
      number_of_note: 0,
      current_note: "",
      x: 0,
      y: 0
    };
  }

  componentWillMount() {
    this.makeSequence();

    document.addEventListener("mousemove", e => {
      this.setState(this.getMousePosition(e));
    });

    document.addEventListener("click", () => {
      this.setState({single_notes: [...this.state.single_notes, _.sample(airport)]});
    });
  }

  getMousePosition(e) {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }


  makeBeat() {
    let octave = _.sample([4, 5, 6]);

    let nextBeat = [];

    _.each(_.sample(airport_progressions), item => {
      nextBeat.push(_.sample(_.filter(airport, particle => particle.note  === item && particle.octave === octave )));
    });

    return _.shuffle(nextBeat);
  }

  makeSequence() {
    this.setState({sequence: [...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat()]});
  }

  nextParticle(timeout) {
    setTimeout(this.setState({number_of_note: this.state.number_of_note + 1}), _.random(2,6.5)/timeout);
    if (this.state.number_of_note === 20) {
      this.makeSequence();
      this.setState({number_of_note: 0});
    }
  }

  render() {
    let sequence = this.state.sequence;
    return (
        <div className="orchestrator" id="orchestrator-wrapper">
          <div className="paths">
            {_.map(sequence, (item, key) => {
              return <div key={key}
                          className={this.state.number_of_note === key ? "current-note" : ""}>{item.note + item.octave}
                    {console.log(key)}
                <Sound
                    url={item.file}
                    playbackRate={this.state.y - this.state.x + 1}
                    volume={25}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={() => this.nextParticle(key)}
                />
              </div>
            })}
            {_.map(this.state.single_notes, (item) => {
              return <Sound
                    url={item.file}
                    playbackRate={1}
                    volume={50}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={() => this.setState({single_notes: _.filter(this.state.single_notes, note => note.file !== item.file )})}
                />
            })}
          </div>
          <button className="btn btn-sequence" onClick={() => this.makeSequence()}>Generate a sequence</button>
        </div>
    )

  }
}