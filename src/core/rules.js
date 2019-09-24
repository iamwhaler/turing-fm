import _ from "lodash";

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

      return store;
    }
  }
};