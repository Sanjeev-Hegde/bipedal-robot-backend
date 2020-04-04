import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Robot, RobotRelations, Pca9685, Movement} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {Pca9685Repository} from './pca9685.repository';
import {MovementRepository} from './movement.repository';

export class RobotRepository extends DefaultCrudRepository<
  Robot,
  typeof Robot.prototype.id,
  RobotRelations
> {

  public readonly pca9685s: HasManyRepositoryFactory<Pca9685, typeof Robot.prototype.id>;

  public readonly movements: HasManyRepositoryFactory<Movement, typeof Robot.prototype.id>;

  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource, @repository.getter('Pca9685Repository') protected pca9685RepositoryGetter: Getter<Pca9685Repository>, @repository.getter('MovementRepository') protected movementRepositoryGetter: Getter<MovementRepository>,
  ) {
    super(Robot, dataSource);
    this.movements = this.createHasManyRepositoryFactoryFor('movements', movementRepositoryGetter,);
    this.registerInclusionResolver('movements', this.movements.inclusionResolver);
    this.pca9685s = this.createHasManyRepositoryFactoryFor('pca9685s', pca9685RepositoryGetter,);
    this.registerInclusionResolver('pca9685s', this.pca9685s.inclusionResolver);
  }
}
