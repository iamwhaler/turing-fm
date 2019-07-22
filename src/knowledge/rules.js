import _ from "lodash";

export const rules = {
  tickRule: {
    onTick: (store, params) => {
      if (store.tick % 3 === 0) {
        store.rhythm_sequence = _.sample(params.helpers.fetchSequence(params.helpers.requestSequence(params.gin)));
        params.helpers.createSound(_.sample(store.fetched_sequence).file);
      }

      _.each(store.fetched_sequence, item => {
        if (item.time === store.tick) {
          params.helpers.createSound(item.file);
        }
      });

      return store;
    }
  }
};