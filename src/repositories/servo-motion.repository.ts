import {DefaultCrudRepository} from '@loopback/repository';
import {ServoMotion, ServoMotionRelations} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServoMotionRepository extends DefaultCrudRepository<
  ServoMotion,
  typeof ServoMotion.prototype.id,
  ServoMotionRelations
> {
  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource,
  ) {
    super(ServoMotion, dataSource);
  }
}
