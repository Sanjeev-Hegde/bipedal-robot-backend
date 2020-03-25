import {DefaultCrudRepository} from '@loopback/repository';
import {ServoType, ServoTypeRelations} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServoTypeRepository extends DefaultCrudRepository<
  ServoType,
  typeof ServoType.prototype.id,
  ServoTypeRelations
> {
  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource,
  ) {
    super(ServoType, dataSource);
  }
}
