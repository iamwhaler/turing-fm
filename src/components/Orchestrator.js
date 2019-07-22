import React from 'react';
import {notes} from "../knowledge/piano_notes"
import _ from "lodash";
import Sound from "react-sound";
import Slider from '@material-ui/lab/Slider';


export class Orchestrator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      single_notes: [],
      text_sequence: "",
      number_of_note: 0,
      current_note: "",
      path_seq: [],
      generated: false,
      x: 0,
      y: 0
    };
  }

  componentWillMount() {
    this.makeSequence();

    document.addEventListener("mousemove", e => {
      // this.setState({
      //   x: e.clientX,
      //   y: e.clientY
      // });
    });

    document.addEventListener("click", () => {
      this.setState({single_notes: [...this.state.single_notes, _.sample(this.props.gin.store.fetched_sequence)]});
    });

    this.props.gin.params.helpers.requestSequence(this.props.gin);
  }


  makeBeat() {
    let octave = _.sample([4, 5, 6]);

    let nextBeat = [];

    if (this.props.gin.store.sequence) {
      _.map(this.props.gin.store.sequence, item => {
        this.props.gin.params.helpers.fetchSequence(item);
        nextBeat.push(_.sample(_.filter(notes, note => note.note === item)));
      });
    }
    return _.shuffle(nextBeat);
  }

  makeSequence() {
    this.setState({sequence: [...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat(), ...this.makeBeat()]});
  }

  nextParticle(timeout) {

    setTimeout(this.setState({number_of_note: this.state.number_of_note + 1}), _.random(5, 10) / timeout);
    if (this.state.number_of_note >= this.props.gin.store.fetched_sequence.length) {
      this.makeSequence();
    }
  }

  render() {
    let sequence = this.state.sequence;
    let gin = this.props.gin;
    return (
        <div className="orchestrator" id="orchestrator-wrapper">
          <div className="btn-container">
            <button className="btn btn-sequence" onClick={() => this.props.gin.params.helpers.requestSequence(this.props.gin)}>Generate a sequence
            </button>
          </div>
          <div className="paths">
            {_.map(this.state.single_notes, (item, key) => {
              return <Sound
                  key={key}
                  url={item.file}
                  playbackRate={1}
                  volume={10}
                  playStatus={Sound.status.PLAYING}
                  onFinishedPlaying={() => this.setState({single_notes: _.filter(this.state.single_notes, note => note.file !== item.file)})}
              />
            })}

            {_.map(this.props.gin.store.fetched_sequence, (item, key) => {
                  return <div key={key}
                              className={this.state.number_of_note === key ? "current-note" : ""}>{item.note + item.octave}

                  </div>
                })}
          </div>
        </div>
    )

  }
}