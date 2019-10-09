import Tone from 'tone';
import { Chord, Note, Distance } from 'tonal';
import samples from '../knowledge/samples.json';

const violinsSamples = samples['vsco2-cello-spic'];

const findClosest = note => {
  const noteMidi = Note.midi(note);
  const maxInterval = 96;
  let interval = 0;
  while (interval <= maxInterval) {
    const higherNote = Note.fromMidi(noteMidi + interval);
    if (violinsSamples[higherNote]) {
      return higherNote;
    }
    const lowerNote = Note.fromMidi(noteMidi - interval);
    if (violinsSamples[lowerNote]) {
      return lowerNote;
    }
    interval += 1;
  }
  return note;
};

Promise.all(
    Reflect.ownKeys(violinsSamples).map(
        note =>
            new Promise(resolve => {
              const buffer = new Tone.Buffer(violinsSamples[note], () =>
                  resolve(buffer)
              );
            })
    )
).then(buffers => {
  const violinsBuffers = Reflect.ownKeys(violinsSamples).reduce(
      (buffersByKey, note, i) => {
        buffersByKey[note] = buffers[i];
        return buffersByKey;
      },
      {}
  );
  const playNote = note => {
    const closestSample = findClosest(note);
    const difference = Distance.semitones(note, closestSample);
    const buffer = violinsBuffers[closestSample];
    const bufferSource = new Tone.BufferSource(buffer).toMaster();
    const playbackRate = Tone.intervalToFrequencyRatio(-24 + difference);
    bufferSource.set({ playbackRate });
    const lfo = new Tone.LFO({
      min: playbackRate - 0.01,
      max: playbackRate + 0.01,
      frequency: Math.random() / 10,
    });
    //lfo.connect(bufferSource.playbackRate);
    //lfo.start();
    bufferSource.start();
  };
  const notes = Chord.notes('C2', 'm7');
  notes.forEach(playNote);

  // playRandom();
  // setInterval(() => {
  //   playRandom();
  // }, 30000);
});