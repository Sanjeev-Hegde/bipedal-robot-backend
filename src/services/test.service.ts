import { bind, /* inject, */ BindingScope } from '@loopback/core';

@bind({ scope: BindingScope.SINGLETON })
export class Test {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
}
