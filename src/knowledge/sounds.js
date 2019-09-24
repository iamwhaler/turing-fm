import {notes} from "./piano_samples";

export const sounds = {
  piano: {
    sample_bank: notes,
    proxy: "https://cors.io/?",
    endpoint: "https://turing-fm-api.herokuapp.com/sequence",
    getSequence: (gin) => {
      let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XMLHttpRequest;
      let xhr = new XHR();
      xhr.open('GET', this.proxy + this.endpoint, true);
      xhr.onload = function() {
        console.log(gin);
        _.each(JSON.parse(this.responseText), item => {
          try {
            gin.store.fetched_sequence.push(_.sample(_.filter(this.sample_bank, note => note.note === item)));
          }
          catch (e) {
            console.log(e)
          }

        });
      };
      xhr.send();
    }
  }
};