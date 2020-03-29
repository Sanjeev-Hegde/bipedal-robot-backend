import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Movement, MovementRelations, Action} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ActionRepository} from './action.repository';

export class MovementRepository extends DefaultCrudRepository<
  Movement,
  typeof Movement.prototype.id,
  MovementRelations
> {

  public readonly actions: HasManyRepositoryFactory<Action, typeof Movement.prototype.id>;

  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource, @repository.getter('ActionRepository') protected actionRepositoryGetter: Getter<ActionRepository>,
  ) {
    super(Movement, dataSource);
    this.actions = this.createHasManyRepositoryFactoryFor('actions', actionRepositoryGetter,);
    this.registerInclusionResolver('actions', this.actions.inclusionResolver);
  }
}
