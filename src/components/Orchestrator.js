import React from 'react';
import ReactDOM from 'react-dom';
import notes, { airport, airport_progression } from "../knowledge/piano_notes"
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
    //setInterval(this.createParticle(), 200)
  }

  makeBeat() {
    let octave = _.sample([4, 5, 6]);

    let nextBeat = [];
    _.each(airport_progression, item => {
      nextBeat.push(_.sample(_.filter(airport, particle => particle.note  ===  item)));
    });

    return _.shuffle(nextBeat);
  }

  makeSequence() {
    this.setState({sequence: [...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat()]});
  }

  nextParticle() {
    //this.createParticle();
    this.setState({number_of_note: this.state.number_of_note + 1});
    if (this.state.number_of_note === 15) {
      this.makeSequence();
      this.setState({number_of_note: 0});
    }
  }

  render() {
    let sequence = this.state.sequence;
    let {timeout, rate} = this.props;
    return (
        <div className="orchestrator" id="orchestrator-wrapper">
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
                          className={this.state.number_of_note === key ? "current-note" : ""}>{item.note + item.octave}
                <Sound
                    url={item.file}
                    playbackRate={this.props.rate ? this.props.rate : 0.9}
                    volume={25}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={() => {
                      setTimeout(this.nextParticle(), this.props.timeout * 10000 * key);
                    }}
                /></div>
            })}
          </div>
          <button className="btn btn-sequence" onClick={() => this.makeSequence()}>Generate a sequence</button>
        </div>
    )

  }
}