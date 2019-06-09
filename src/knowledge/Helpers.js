import _ from "lodash";

export default class Helpers {
  constructor(gin) {
    this.gin = gin;
  }

  brutalSet = state => {
    this.gin.setState(state, 0);
  };
}