import _ from "lodash";

export const default_state = {
  frame: 0,
  tick: 0,
  game_speed: 900,
  frame_rate: 1,
  game_speed_multiplier: 1,
  game_paused: true,
  fetched_sequence: [],
  shortcuts_enabled: false,
  language: "en",
  soundEnable: true,
  volume: 100,
  orchestrator: {
    musicEnable: true,
    volume: 15,
    didMonthPassed: false,
    previousMonthMoney: 0,
    previousHeadCount: 0,
    dateOfRecord: 0,
    monthTension: "low"
  }
};

export const getDefaultState = () => {
  return _.cloneDeep(default_state);
};
