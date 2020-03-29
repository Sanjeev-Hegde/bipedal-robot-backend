import {DefaultCrudRepository} from '@loopback/repository';
import {Motion, MotionRelations} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MotionRepository extends DefaultCrudRepository<
  Motion,
  typeof Motion.prototype.id,
  MotionRelations
> {
  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource,
  ) {
    super(Motion, dataSource);
  }
}
