import _ from "lodash";
import { notes } from "./piano_notes";
import Sound from "react-sound";
import React from "react"

const _PROXY = "https://cors-anywhere.herokuapp.com/";
const _ENDPOINT = "https://turing-fm-api.herokuapp.com/sequence";

export default class Helpers {
  constructor(gin) {
    this.gin = gin;
  }

  brutalSet = state => {
    this.gin.setState(state, 0);
  };

  requestSequence = (gin, callback) => {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XMLHttpRequest;
    let xhr = new XHR();
    xhr.open('GET', _PROXY + _ENDPOINT, true); // proxy chaining
    xhr.onload = function() {
      console.log(gin);
      _.each(JSON.parse(this.responseText), item => gin.store.fetched_sequence.push(_.sample(_.filter(notes, note => note.note === item))));
      //gin.setState({ fetched_sequence: [...gin.store.fetched_sequence, ...gin.params.helpers.fetchSequence(JSON.parse(this.responseText))]});
    };
    xhr.send();
  };

  fetchSequence = (seq) => {
    let fetchedNotes = [];
    _.each(seq, item => fetchedNotes.push(_.sample(_.filter(notes, note => note.note === item))));
    return fetchedNotes
    //console.log(fetchedNotes);
  };

  createOrchestrator(item) {
    return <Sound
        url={item.file}
        playbackRate={1}
        volume={5}
        playStatus={Sound.status.PLAYING}
    />
  };
}