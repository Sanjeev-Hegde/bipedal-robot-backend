import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pca9685, Pca9685Relations, Servo} from '../models';
import {BipedalRobotDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ServoRepository} from './servo.repository';

export class Pca9685Repository extends DefaultCrudRepository<
  Pca9685,
  typeof Pca9685.prototype.id,
  Pca9685Relations
> {

  public readonly servos: HasManyRepositoryFactory<Servo, typeof Pca9685.prototype.id>;

  constructor(
    @inject('datasources.bipedalRobotDB') dataSource: BipedalRobotDbDataSource, @repository.getter('ServoRepository') protected servoRepositoryGetter: Getter<ServoRepository>,
  ) {
    super(Pca9685, dataSource);
    this.servos = this.createHasManyRepositoryFactoryFor('servos', servoRepositoryGetter,);
    this.registerInclusionResolver('servos', this.servos.inclusionResolver);
  }
}
