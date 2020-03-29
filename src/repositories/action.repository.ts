import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Action, ActionRelations, Motion} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MotionRepository} from './motion.repository';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id,
  ActionRelations
> {

  public readonly motions: HasManyRepositoryFactory<Motion, typeof Action.prototype.id>;

  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource, @repository.getter('MotionRepository') protected motionRepositoryGetter: Getter<MotionRepository>,
  ) {
    super(Action, dataSource);
    this.motions = this.createHasManyRepositoryFactoryFor('motions', motionRepositoryGetter,);
    this.registerInclusionResolver('motions', this.motions.inclusionResolver);
  }
}
