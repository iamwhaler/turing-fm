import _ from "lodash";

export const rules = {
  tickRule: {
    onTick: (store, params) => {
      store.rhythm_sequence = store.rhythm;
      if (store.tick % 10 === 0) {
        params.helpers.requestSequence(params.gin);
        store.rhythm = _.sample(store.fetched_sequence);
      }
      store.rhythm_sequence = [];
      return store;
    }
  }
};