import { bind, /* inject, */ BindingScope } from '@loopback/core';
var Pca9685Driver = require("pca9685").Pca9685Driver;
const i2cBus = require('i2c-bus');

@bind({ scope: BindingScope.SINGLETON })
export class Pwm {
  private options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
  };
  pwm: any;
  constructor(/* Add @inject to inject parameters */) {

  }
  initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //console.log("Initializing pwm")
      this.pwm = new Pca9685Driver(this.options, function startLoop(err: any) {
        if (err) {
          console.error("Error initializing PCA9685");
          // process.exit(-1);
          reject(false);
        }
        resolve(true);
      });
    });

  }
  dispose() {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    this.pwm.dispose();
  }

  getPWM(): any {
    return this.pwm;
  }
  /*
   * Add service methods here
   */
}
