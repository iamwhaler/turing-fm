import _ from "lodash";

export const genChordProgression = (gin, store, base, progressions, type = "optimist") => {
  let prog_pool = progressions.filter(item => {
    return item.base === base && item.type === type;
  });

  if (prog_pool.length > 1) {
    store.progression = [...store.progression, ...[_.sample(prog_pool)]];
  } else {
    store.progression = [...store.progression, ...prog_pool];
  }
  console.log(store.progression);
  gin.setState(store);
};

export const genSequence = (gin, store, chords, base) => {
  let sequence = [];
  if (!base && store.progression) store.progression.forEach(key => {
    key.chords.forEach((chord, id) => {
      sequence.push(chords.filter(seq => seq.chord === chord)[0].notes)
    });
  });
  console.log(sequence);
  gin.setState(store);
};