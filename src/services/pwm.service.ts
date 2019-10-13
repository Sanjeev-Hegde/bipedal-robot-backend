import { bind, /* inject, */ BindingScope } from '@loopback/core';
import Pca9685Driver from 'pca9685';
const i2cBus = require('i2c-bus');

@bind({ scope: BindingScope.SINGLETON })
export class Pwm {
  private options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
  };
  pwm: Pca9685Driver;

  constructor(/* Add @inject to inject parameters */) {
    console.log("Initializing pwm")
    this.pwm = new Pca9685Driver(this.options, function startLoop(err) {
      if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
      }
    });
  }

  dispose() {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    this.pwm.dispose();
  }

  getPWM(): Pca9685Driver {
    return this.pwm;
  }
  /*
   * Add service methods here
   */
}
