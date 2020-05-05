import _ from "lodash";

class _Lamp {
  constructor() {
    this.gins = {};
  }

  register(jin) {
    this.gins[jin.game_name] = jin;
  }

  call(name) {
    return this.gins[name];
  }

  rub() {
    return _.sample(this.gins);
  }
}

const Lamp = new _Lamp();
export default Lamp;
