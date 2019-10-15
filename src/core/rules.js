import _ from "lodash";
import { genChordProgression, genSequence } from "../features/progressions_algorhythm";
import { progressions, chords } from "../knowledge/piano_notes";

export const rules = {
  tick: {
    onTick: (store, params) => {

      _.each(store.fetched_sequence, (item, key) => {
        if (item.time === store.tick) {
          //params.helpers.createSound(item.file);

          params.helpers.createToneSound(item.note + item.octave , item.file);
          store.orchestrator.current_note = key;
        }
      });

      if (store.progression.length < 4) genChordProgression(params.gin, store, "C", progressions);

      if (store.sequence.length < 4) genSequence(params.gin, store, chords);

      if (store.tick % 20 === 0) _.each(store.sequence, note => {
        store.fetched_sequence = [...params.helpers.fetchSequenceNew(note), ...store.fetched_sequence];
      });

      store.fetched_sequence.forEach((item, key) => {
         item.time = _.random(store.tick, Math.floor(store.tick + key * 2));
      });

      return store;
    }
  }
};