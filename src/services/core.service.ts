import { bind, BindingScope, service } from '@loopback/core';
import { Pwm } from './pwm.service';
import { Pca9685, Servo } from '../models';

export class ServoHelper extends Servo {
  currentPosition?: number;
}
export class PwmServoMap {
  pwm: Pwm;
  servoMap: Map<number, ServoHelper>
}
@bind({ scope: BindingScope.SINGLETON })
export class Core {
  pca9685Map: Map<number, PwmServoMap>
  isInitialized: boolean;
  constructor() {
    this.pca9685Map = new Map();
  }

  /*
   * Add service methods here
   */

  initializePWMs(pca9685List: Array<Pca9685>) {
    pca9685List.forEach(pca9685 => {
      let pca9685Id = pca9685.getId();
      if (this.pca9685Map.get(pca9685Id)) {
        console.log("Pca9685:" + pca9685Id + " already initialized");
      }
      else {
        let pwm = new Pwm();
        pwm.initialize().then(() => {
          // this.pca9685Map.set(pca9685Id, new Map());
          let pwmServoMap = new PwmServoMap();
          pwmServoMap.pwm = pwm;
          pwmServoMap.servoMap = new Map();
          pca9685.servos.forEach(servo => {
            pwmServoMap.servoMap.set(servo.getId(), servo);
          });
          this.pca9685Map.set(pca9685Id, pwmServoMap);
          console.log("Pca9685:" + pca9685Id + " initialized");
        });
      }
    });
  }

  moveServo(pwm: Pwm, servo: ServoHelper, angle: number, speed?: number) {
    let diff = (1500 - servo.minPulseLength);
    let finalPosition = (angle * diff / 90) + servo.minPulseLength;
    let sp = speed ? speed : 8;
    if (!servo.currentPosition) {
      pwm.setPulseLength(servo.channel, finalPosition);
      servo.currentPosition = finalPosition;
    }
    else {
      let currentPosition = servo.currentPosition;
      if (servo.currentPosition < finalPosition) {
        let intervalId = setInterval(() => {
          currentPosition = currentPosition + sp;
          if (currentPosition >= finalPosition) {
            currentPosition = finalPosition;
            pwm.setPulseLength(servo.channel, finalPosition);
            servo.currentPosition = currentPosition;
            clearInterval(intervalId);
          }
          else {
            pwm.setPulseLength(servo.channel, currentPosition);
            servo.currentPosition = currentPosition;
          }
        }, 20)
      }
      else {
        let intervalId = setInterval(() => {
          currentPosition = currentPosition - sp;
          if (currentPosition <= finalPosition) {
            currentPosition = finalPosition;
            pwm.setPulseLength(servo.channel, finalPosition);
            servo.currentPosition = currentPosition;
            clearInterval(intervalId);
          }
          else {
            pwm.setPulseLength(servo.channel, currentPosition);
            servo.currentPosition = currentPosition;
          }
        }, 20)
      }
    }
  }

  getIsInitialized(pca9685Id: number): boolean {
    return this.pca9685Map.get(pca9685Id) ? true : false;
  }

  getInitializedPca9685s(pca9685List: Array<Pca9685>): Map<number, boolean> {
    let initializedMap: Map<number, boolean> = new Map();
    pca9685List.forEach(pca9685 => {
      this.pca9685Map.get(pca9685.getId()) ? initializedMap.set(pca9685.getId(), true) : initializedMap.set(pca9685.getId(), false);
    });
    return initializedMap;
  }
}
