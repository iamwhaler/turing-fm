import _ from "lodash";

export const default_state = {
  frame: 0,
  tick: 0,
  game_speed: 900,
  frame_rate: 1,
  game_speed_multiplier: 1,
  endpoint_url: "",
  game_paused: true,
  fetched_sequence: [],
  rhythm_sequence: {},
  rhythm: {},
  shortcuts_enabled: false,
  language: "en",
  soundEnable: true,
  volume: 100,
  orchestrator: {
    current_note: 0,
    musicEnable: true,
    playback_rate: 1,
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
