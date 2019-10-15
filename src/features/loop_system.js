import Tone from "tone";

export const createLoop = callback => {
  return new Tone.Loop(callback, "8n").toMaster().start(0);
};

export const createArp = (gin, store, sequence, pattern) => {
  var arp = new Tone.Pattern(callback, sequence, pattern || "downUp").toMaster().start(0);
  arp.pattern = pattern || "downUp";
};

