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
      text_sequence: "",
      number_of_note: 0,
      current_note: ""
    };
  }

  componentWillMount() {
    this.makeSequence();
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
    setTimeout(this.setState({number_of_note: this.state.number_of_note + 1}), 10/timeout);
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
                    playbackRate={1}
                    volume={25}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={() => this.nextParticle(key)}
                /></div>
            })}
          </div>
          <button className="btn btn-sequence" onClick={() => this.makeSequence()}>Generate a sequence</button>
        </div>
    )

  }
}