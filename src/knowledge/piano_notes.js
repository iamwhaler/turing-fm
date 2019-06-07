import a4 from "../audio/piano-f-a4.wav";
import a5 from "../audio/piano-f-a5.wav";
import a6 from "../audio/piano-f-a6.wav";

import ab4 from "../audio/airport/piano-Ab4.mp3";
import ab5 from "../audio/airport/piano-Ab5.mp3";
import ab6 from "../audio/airport/piano-Ab6.mp3";

// import c4 from "../audio/piano-f-c4.wav";
// import c5 from "../audio/piano-f-c5.wav";
// import c6 from "../audio/piano-f-c6.wav";

import c4 from "../audio/airport/piano-C4.mp3";
import c5 from "../audio/airport/piano-C5.mp3";
import c6 from "../audio/airport/piano-C6.mp3";

import d4 from "../audio/piano-f-d4.wav";
import d5 from "../audio/piano-f-d5.wav";
import d6 from "../audio/piano-f-d6.wav";

import db4 from "../audio/airport/piano-Db4.mp3";
import db5 from "../audio/airport/piano-Db5.mp3";
import db6 from "../audio/airport/piano-Db6.mp3";

import eb4 from "../audio/airport/piano-Eb4.mp3";
import eb5 from "../audio/airport/piano-Eb5.mp3";
import eb6 from "../audio/airport/piano-Eb6.mp3";

import f4 from "../audio/airport/piano-F4.mp3";
import f5 from "../audio/airport/piano-F5.mp3";
import f6 from "../audio/airport/piano-F6.mp3";

const notes = [
  {note: 'A', octave: 4, file: a4},
  {note: 'A', octave: 5, file: a5},
  {note: 'A', octave: 6, file: a6},
  {note: 'C', octave: 4, file: c4},
  {note: 'C', octave: 5, file: c5},
  {note: 'C', octave: 6, file: c6},
  {note: 'D#', octave: 4, file: d4},
  {note: 'D#', octave: 5, file: d5},
  {note: 'D#', octave: 6, file: d6},
  {note: 'F#', octave: 4, file: f4},
  {note: 'F#', octave: 5, file: f5},
  {note: 'F#', octave: 6, file: f6}
];


export const airport = [
  {note: 'Ab', octave: 4, file: ab4},
  {note: 'Ab', octave: 5, file: ab5},
  {note: 'Ab', octave: 6, file: ab6},
  {note: 'C', octave: 4, file: c4},
  {note: 'C', octave: 5, file: c5},
  {note: 'C', octave: 6, file: c6},
  {note: 'Db', octave: 4, file: db4},
  {note: 'Db', octave: 5, file: db5},
  {note: 'Db', octave: 6, file: db6},
  {note: 'Eb', octave: 4, file: eb4},
  {note: 'Eb', octave: 5, file: eb5},
  {note: 'Eb', octave: 6, file: eb6},
  {note: 'F', octave: 4, file: f4},
  {note: 'F', octave: 5, file: f5},
  {note: 'F', octave: 6, file: f6}
];

export const airport_progressions = [["Ab", "C", "Db", "Eb", "F"], ["Ab", "Db", "Eb", "C", "Eb"], ["Ab", "Db", "Ab", "C", "F"]];

export default notes;