import { Model, model, property, hasMany, Entity } from '@loopback/repository';
import { Pca9685 } from './pca9685.model';
import { Movement } from './movement.model';

@model()
export class Robot extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Pca9685)
  pca9685s: Pca9685[];

  @hasMany(() => Movement)
  movements: Movement[];

  constructor(data?: Partial<Robot>) {
    super(data);
  }
}

export interface RobotRelations {
  // describe navigational properties here
}

export type RobotWithRelations = Robot & RobotRelations;
