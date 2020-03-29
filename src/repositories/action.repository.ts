import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Action, ActionRelations, ServoMotion } from '../models';
import { BipedalRobotDbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ServoMotionRepository } from './servo-motion.repository';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id,
  ActionRelations
  > {
  public readonly servoMotions: HasManyRepositoryFactory<ServoMotion, typeof Action.prototype.id>;

  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource, @repository.getter('ServoMotionRepository') protected servoMotionRepositoryGetter: Getter<ServoMotionRepository>,
  ) {
    super(Action, dataSource);
    this.servoMotions = this.createHasManyRepositoryFactoryFor('servoMotions', servoMotionRepositoryGetter);
    this.registerInclusionResolver('servoMotions', this.servoMotions.inclusionResolver);
  }
}
