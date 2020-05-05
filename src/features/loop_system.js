import Tone from "tone";

export const createLoop = (instrument = false) => {
  let synth = instrument || new Tone.MembraneSynth().toMaster();

  var loop = new Tone.Loop(function(time){
    synth.triggerAttackRelease("C4", "8n", time)
  }, "8n");

//play the loop between 0-2m on the transport
  loop.start(0).stop('10m');
};

export const createArp = (gin, store, sequence, pattern, callback) => {
  var arp = new Tone.Pattern(callback, sequence, pattern || "downUp").toMaster().start(0);
  arp.pattern = pattern || "downUp";
};

export const createSequence = () => {
  let synth = new Tone.FMSynth().toMaster();
  Tone.Transport.bpm.value = 120;

  //schedule a few notes
  Tone.Transport.schedule(triggerSound(synth, 0), 0);
  Tone.Transport.schedule(triggerSound(synth, '0:2'), '0:2');
  Tone.Transport.schedule(triggerSound(synth, '0:2:2.5'), '0:2:2.5');

  //set the transport to repeat
  Tone.Transport.loopEnd = '1m';
  Tone.Transport.loop = true
};

export const setBPM = value => {
  Tone.Transport.bpm.value = value;
};

function triggerSound(instrument, time, note = 'C4'){
  //the time is the sample-accurate time of the event
  instrument.triggerAttackRelease(note, '8n', time)
}

export const createKick = () => {
  var synth = new Tone.MembraneSynth().toMaster();

  var loop = new Tone.Loop(function(time){
    synth.triggerAttackRelease("C1", "8n", time)
  }, "4n");

//play the loop between 0-2m on the transport
  loop.start(0).stop('30m');
}