import { bind, /* inject, */ BindingScope } from '@loopback/core';
var Pca9685Driver = require("pca9685").Pca9685Driver;
//import Pca9685Driver from 'pca9685'
const i2cBus = require('i2c-bus');

//@bind({ scope: BindingScope.TRANSIENT })
export class Pwm {
  private options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
  };
  protected pwm: any;
  constructor(/* Add @inject to inject parameters */) {
  }
  initialize(address?: number, frequency?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //console.log("Initializing pwm")
      if (address) this.options.address = address;
      if (frequency) this.options.frequency = frequency;
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

  allChannelsOff(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.allChannelsOff((error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  channelOff(channel: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.channelOff(channel, (error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  channelOn(channel: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.channelOn(channel, (error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  setDutyCycle(channel: number, dutyCycleDecimalPercentage: number, onStep?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.setDutyCycle(channel, dutyCycleDecimalPercentage, onStep, (error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  setPulseLength(channel: number, pulseLengthMicroSeconds: number, onStep?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.setPulseLength(channel, pulseLengthMicroSeconds, onStep, (error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  setPulseRange(channel: number, onStep: number, offStep: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pwm.setPulseRange(channel, onStep, offStep, (error: any) => {
        if (error) reject(false);
        else
          resolve(true);
      })
    })
  }

  // getPWM() {
  //   return this.pwm;
  // }
  /*
   * Add service methods here
   */
}
