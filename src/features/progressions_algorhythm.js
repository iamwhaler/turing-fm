import _ from "lodash";

export const genChordProgression = (gin, store, base, progressions, type = "optimist") => {
  let prog_pool = progressions.filter(item => {
    return item.base === base && item.type === type;
  });

  if (prog_pool.length > 1) prog_pool = _.sample(prog_pool);
  store.progression = store.progression.concat(prog_pool);
  gin.setState(store);
};

export const genSequence = (gin, store, chords, base) => {
  if (!base && store.progression) store.progression.forEach(key => {
    key.chords.forEach(chord => {
      store.sequence.push(chords.filter(seq => seq.chord === chord)[0].notes)
    });
  });
  gin.setState(store);
};