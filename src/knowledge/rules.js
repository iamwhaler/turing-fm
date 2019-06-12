const _ENDPOINT_URL = "https://small-gm-api.herokuapp.com/sequence";

export const rules = {
  tickRule: {
    onTick: (store, params) => {
      if (store.tick % 10 === 0) {
        params.helpers.requestSequence(_ENDPOINT_URL, params.gin)
      }
      return store;
    }
  }
};