import _ from "lodash";

class _Lamp {
  constructor() {
    this.gins = {};
  }

  register(jin) {
    // console.log('register', jin);
    this.gins[jin.game_name] = jin;
  }

  call(name) {
    // console.log('call', name, this.gins);
    return this.gins[name];
  }

  rub() {
    // console.log('rub', _.sample(this.gins));
    return _.sample(this.gins);
  }
}

const Lamp = new _Lamp();
export default Lamp;
