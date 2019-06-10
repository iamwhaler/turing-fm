import _ from "lodash";
import notes from "./piano_notes";

export default class Helpers {
  constructor(gin) {
    this.gin = gin;
  }

  brutalSet = state => {
    this.gin.setState(state, 0);
  };

  fetchSequence = (seq, state) => {
    let fetchedNotes = [];
    _.each(seq, item => fetchedNotes.push(_.sample(_.filter(notes, note => note.note === item))));
    return fetchedNotes
    //console.log(fetchedNotes);
  }
}