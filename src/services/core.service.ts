import { bind, BindingScope, service } from '@loopback/core';
import { Pwm } from './pwm.service';

@bind({ scope: BindingScope.SINGLETON })
export class Core {
  pwm: Pwm;
  isInitialized: boolean;
  constructor(@service(Pwm) pwm: Pwm) {
    this.pwm = pwm;
    this.initializePWM();
  }

  /*
   * Add service methods here
   */

  initializePWM() {
    this.pwm.initialize().then(() => {
      this.setInitialized(true);
      console.log("initialized:::" + this.getIsInitialized());
    }).catch(() => {
      console.log("Couldnt initialize pwm");
      process.exit(-1);
    })
  }

  setInitialized(isInitialized: boolean) {
    this.isInitialized = isInitialized;
  }

  getIsInitialized() {
    return this.isInitialized;
  }
}
