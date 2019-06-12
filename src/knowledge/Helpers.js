import _ from "lodash";
import notes from "./piano_notes";


export default class Helpers {
  constructor(gin) {
    this.gin = gin;
  }

  brutalSet = state => {
    this.gin.setState(state, 0);
  }

  requestSequence = (url, gin, callback) => {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XMLHttpRequest;
    let xhr = new XHR();
    xhr.open('GET', "https://cors-anywhere.herokuapp.com/" + url, true); // proxy chaining
    xhr.onload = function() {
      gin.setState({ fetched_sequence: [...gin.store.fetched_sequence, ...gin.params.helpers.fetchSequence(JSON.parse(this.responseText))]});
    };
    xhr.send();
  };

  fetchSequence = (seq) => {
    let fetchedNotes = [];
    _.each(seq, item => fetchedNotes.push(_.sample(_.filter(notes, note => note.note === item))));
    return fetchedNotes
    //console.log(fetchedNotes);
  }
}