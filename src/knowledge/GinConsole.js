import _ from "lodash";

export class GinConsole {
  constructor(gin) {
    this.gin = gin;
    this.isInterfaceOpen = false;
    this.log = (...message) => {
      console.log(...message);
    };
    this.warn = (...message) => {
      console.warn(...message);
    };
    this.error = (...message) => {
      console.error(...message);
    };
  }

  parseConsoleCommand = (command, console_commands = {}, methods = {}) => {
    const args = command.split(" ");
    const commandName = args.shift();

    if (console_commands[commandName]) {
      console_commands[commandName]({ gin: this.gin, methods: methods }, ...args);
    } else if (this.commands[commandName]) {
      this.commands[commandName](...args);
    }
  };

  commands = {
    help: () => {
      Object.keys(this.commands).forEach(command => {
        this.log(command);
      });
    },
    echo: (...message) => {
      this.log(...message);
    },
    performLoggedTick: () => {
      const store = this.gin.store;

      _.each(this.gin.rules, (item, key) => {
        if (item.onTick) {
          let t0 = performance.now();

          let next_store = item.onTick(store, this.gin.params);
          if (!next_store) this.log("!!!BROKEN RULE!!!", key, next_store);

          let t1 = performance.now();
          this.log('Performance report for rule "' + key + '": ' + (t1 - t0) + "ms");
        }
      });
    },
    onInterval: n => {
      for (let i = 0; i < n; i++) {
        this.gin.onInterval();
      }
    }
  };
}

