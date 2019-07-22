import _ from "lodash";

export const rules = {
  tick: {
    onTick: (store, params) => {
      if (store.tick % 1 === 0) {
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