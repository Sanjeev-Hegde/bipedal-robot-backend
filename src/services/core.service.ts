import { bind, /* inject, */ BindingScope } from '@loopback/core';

@bind({ scope: BindingScope.TRANSIENT })
export class Core {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  initializeServos() {
    //TODO: get servo objects from database and initialize servos
  }
}
