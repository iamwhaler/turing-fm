import _ from "lodash";

export const rules = {
  tickRule: {
    onTick: (store, params) => {
      if (store.tick % 10 === 0) {
        store.rhythm_sequence = _.sample(params.helpers.fetchSequence(params.helpers.requestSequence(params.gin)));
        params.createSound(_.sample(store.fetched_sequence));
      }
      return store;
    }
  }
};