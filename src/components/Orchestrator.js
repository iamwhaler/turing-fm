import React from 'react';
import notes from "../knowledge/piano_notes"
import _ from "lodash";
import Sound from "react-sound";

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
    let A = _.filter(notes, note => note.note === "A");
    let C = _.filter(notes, note => note.note === "C");
    let Dsharp = _.filter(notes, note => note.note === "D#");
    let Fsharp = _.filter(notes, note => note.note === "F#");

    let beat = _.shuffle([_.sample(Fsharp), _.sample(C), _.sample(A), _.sample(Dsharp),]);

    return beat;
  }

  makeSequence() {
    this.setState({sequence: [...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat()]});
    console.log(this.state.sequence);
  }

  nextParticle() {
    this.setState({number_of_note: this.state.number_of_note + 1});
    if (this.state.number_of_note === 15) {
      this.makeSequence();
      this.setState({number_of_note: 0});
    }
  }

  render() {
    let sequence = this.state.sequence;
    let { timeout, rate } = this.props;
    return (
        <div className="orchestrator">
          <Sound
              url={sequence[this.state.number_of_note].file}
              playbackRate={rate ? rate : 0.9}
              volume={2}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => {
                setTimeout(this.nextParticle(), timeout);
              }}
          />
          <div className="paths">
            {_.map(sequence, (item, key) => {
              return <div key={key}
                  className={this.state.number_of_note === key ? "current-note" : ""}>{item.note + item.octave}</div>
            })}
          </div>
          <button className="btn btn-sequence" onClick={() => this.makeSequence()}>Generate a sequence</button>
        </div>
    )

  }
}