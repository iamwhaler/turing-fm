import _ from "lodash";
import { genChordProgression, genSequence } from "../features/progressions_algorhythm";
import { progressions, chords } from "../knowledge/piano_notes";

export const rules = {
  tick: {
    onTick: (store, params) => {
      _.each(store.fetched_sequence, (item, key) => {
        if (item.time === store.tick) {
          params.helpers.createSound(item.file);
          if (key === store.fetched_sequence.length - 1) {
            params.helpers.requestSequence(params.gin);
          }
          store.orchestrator.current_note = key;
        }
      });

      if (store.progression.length < 4) genChordProgression(params.gin, store, "C", progressions);

      if (store.progression.length > 1) genSequence(params.gin, store, chords);

      return store;
    }
  }
};