import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './bipedal-robot-db.datasource.config.json';

@lifeCycleObserver('datasource')
export class BipedalRobotDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'bipedalRobotDB';

  constructor(
    @inject('datasources.config.bipedalRobotDB', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
