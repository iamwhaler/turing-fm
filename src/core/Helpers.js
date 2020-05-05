import _ from "lodash";
import {piano_notes} from "../knowledge/piano_notes";
import Tone from "tone";
import {soundManager} from "soundmanager2";

const _ENDPOINT = "https://turing-fm-api.herokuapp.com/sequence";

export default class Helpers {
  constructor(gin) {
    this.gin = gin;
  }

  brutalSet = state => {
    this.gin.setState(state, 0);
  };

  changePlaybackRate = (state, value) => {
    state.orchestrator.playback_rate = value;
    this.gin.setState(state);
  };


  createSound = (path, callback) => {
    soundManager.createSound({
      id: new Date(),
      multiShotEvents: true,
      url: path,
      onfinish: function () {
        soundManager._writeDebug(this.url + ' finished playing');
        if (callback) callback();
      }
    }).play();
  };

  createToneSound = (note, path, callback) => {
    let sample = {};
    sample[note] = path;
    let sampler = new Tone.Sampler(sample, function () {
      sampler.triggerAttack(note).triggerRelease("+4n").toMaster().start();
      if (callback) callback();
    })
  };

  createSoundById = (id, url) => {
    soundManager.createSound({
      id: id,
      url: url,
      onload: () => {

      },
      onfinish: () => {
        soundManager._writeDebug(this.id + ' finished playing');
        //soundManager.play(this.id + 1, {});
      }
    }).load().play();
  };

  loopSound = path => {
    soundManager.createSound({
      id: new Date(),
      multiShotEvents: true,
      url: path,
      onfinish: function () {
        soundManager._writeDebug(this.url + ' finished playing');
      }
    }).play({loops: 42});
  };

  getSoundById = id => {
    soundManager.getSoundById(id);
  };

  playSoundById = id => {
    soundManager.play(id, {});
  };

  requestSequence = (gin, callback) => {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XMLHttpRequest;
    let xhr = new XHR();
    xhr.open('GET', _ENDPOINT, true);
    xhr.onload = function () {
      _.each(JSON.parse(this.responseText), item => {
        gin.store.fetched_sequence.push(_.sample(_.filter(piano_notes, note => note.note === item)));
        _.each(gin.store.fetched_sequence, (part, key) => {
          let tick = gin.store.tick;
          gin.store.fetched_sequence[key].time = _.random(tick, tick + 15); // tick is a reference thus dynamic, to fix
        })
      });
      if (callback) callback();
    };
    xhr.send();
  };

  fetchFile = (file) => {
    let result;
    let audioContext = new AudioContext();

    fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          console.log('Received', arrayBuffer);
          audioContext.decodeAudioData(arrayBuffer);
          return arrayBuffer
        })
        .then(audioBuffer => {
          let sourceNode = audioContext.createBufferSource();
          sourceNode.buffer = audioBuffer;
          sourceNode.connect(audioContext.destination);
          sourceNode.start();
        })
        .catch(e => console.error(e));
  };

  fetchSequence = (seq, store) => {
    let fetchedNotes = [];
    _.each(seq, item => fetchedNotes.push(_.sample(_.filter(piano_notes, note => note.note === item))));
    _.each(fetchedNotes, (note, key) => note.time = _.random(store.tick, Math.floor(store.tick + key * 1.6)))
    console.log(fetchedNotes);
    return fetchedNotes
  };

  createLoop = (note, path, interval = "8n") => {
    let callback = this.createToneSound(note, path);
    let loop = new Tone.Loop(callback, interval).start(0);
    Tone.Transport.scheduleRepeat(callback, "8n", "1m");
  }

}