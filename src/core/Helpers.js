import _ from "lodash";
import {piano_notes, clean_piano} from "../knowledge/piano_notes";
import samples from "../knowledge/samples";
import Tone from "tone";
import React from "react"
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

  createSoundById = id => {
    soundManager.createSound({
      id: id,
      url: '../mpc/audio/CHINA_1.mp3',
      onload: () => {

      },
      onfinish: () => {
        soundManager._writeDebug(this.id + ' finished playing');
        //soundManager.play(this.id + 1, {});
      }
    }).load();
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

  fetchSequence = (seq) => {
    let fetchedNotes = [];
    _.each(seq, item => fetchedNotes.push(_.sample(_.filter(piano_notes, note => note.note === item))));
    return fetchedNotes
    //console.log(fetchedNotes);
  };

  fetchSequenceNew = (seq) => {
    let fetchedNotes = [];
    _.each(seq, item => {
      console.log(clean_piano);
    })

    //[{"note" : path}]
    return fetchedNotes
    //console.log(fetchedNotes);
  };

  createLoop = (note, path, interval = "8n") => {
    let callback = this.createToneSound(note, path);
    let loop = new Tone.Loop(callback, interval).start(0);
    Tone.Transport.scheduleRepeat(callback, "8n", "1m");
  }

}