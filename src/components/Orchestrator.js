import React from 'react';
import notes from "../knowledge/piano_notes"
import _ from "lodash";
import Sound from "react-sound";

export class Orchestrator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
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

    return _.shuffle([_.sample(Fsharp).file , _.sample(C).file, _.sample(A).file, _.sample(Dsharp).file, ]);
  }

  makeSequence() {
    this.setState({sequence: [...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat()]});
    console.log(this.state.sequence);
  }

  nextParticle() {
    this.setState({number_of_note: this.state.number_of_note + 1});
    if (this.state.number_of_note === 16) {
      this.makeSequence();
      this.setState({number_of_note: 0});
    }
  }

  render() {
    return (
        <div className="orchestrator">
          <Sound
              url={this.state.sequence[this.state.number_of_note]}
              playbackRate={0.9}
              volume={1}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => {
                this.nextParticle();
              }}
          />
          <Sound
              url={this.state.sequence[this.state.number_of_note]}
              playbackRate={0.45}
              volume={1}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => {
                this.nextParticle();
              }}
          />
          <div className="paths">
          {_.map(this.state.sequence, item => {return <div>{item}</div>})}
          </div>
          <button className="btn btn-sequence" onClick={() => this.makeSequence()}>Generate a sequence</button>
        </div>
    )

  }
}