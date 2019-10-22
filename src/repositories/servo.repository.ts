import {DefaultCrudRepository} from '@loopback/repository';
import {Servo, ServoRelations} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServoRepository extends DefaultCrudRepository<
  Servo,
  typeof Servo.prototype.id,
  ServoRelations
> {
  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource,
  ) {
    super(Servo, dataSource);
  }
}
