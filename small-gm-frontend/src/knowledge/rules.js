export const rules = {
  tickRule: {
    onTick: (store, params) => {
      const time = store.date;
      const game_date = new Date(store.game_unixtime + time.tick * 60 * 60 * 1000);
      const date_config = {
        year: game_date.getFullYear(),
        month: game_date.getMonth(),
        date: game_date.getDate(),
        day: game_date.getUTCDay(),
        hour: game_date.getHours()
      };

      time.tick++;
      time.hour = date_config.hour;
      store = params.helpers.setGameDate(store, game_date);
      return store;
    }
  }
};