import _ from "lodash";
import { genChordProgression, genSequence } from "../features/progressions_algorhythm";
import { progressions, chords } from "../knowledge/piano_notes";

export const rules = {
  tick: {
    onTick: (store, params) => {
      console.log(store.fetched_sequence);

      _.each(store.fetched_sequence, (item, key) => {
        if (item.time === store.tick) {
          //params.helpers.createSound(item.file);
          // if (key === store.fetched_sequence.length - 1) {
          //   params.helpers.requestSequence(params.gin);
          // }

          params.helpers.createToneSound(item.note + item.octave , item.file);
          store.orchestrator.current_note = key;
        }
      });

      if (store.progression.length < 2) genChordProgression(params.gin, store, "C", progressions);

      if (store.sequence.length < 4) genSequence(params.gin, store, chords);

      if (store.tick % 100 === 0) _.each(store.sequence, note => {
        store.fetched_sequence = [...params.helpers.fetchSequence(note), ...store.fetched_sequence];
      });
      console.log(store.fetched_sequence);

      store.fetched_sequence.forEach((item, key) => {
        item.time = _.random(store.tick, Math.floor(store.tick + key * 4));
      });

      return store;
    }
  }
};