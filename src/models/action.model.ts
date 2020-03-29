import { Entity, model, property, hasMany } from '@loopback/repository';
import { ServoMotion } from './servo-motion.model';

@model()
export class Action extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  sequenceId: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
  })
  delay?: number;

  @property({
    type: 'number',
  })
  goTo?: number;

  @property({
    type: 'number',
  })
  movementId?: number;

  @hasMany(() => ServoMotion)
  servoMotions: ServoMotion[];
  // Define well-known properties here

  constructor(data?: Partial<Action>) {
    super(data);
  }
}

export interface ActionRelations {
  // describe navigational properties here
}

export type ActionWithRelations = Action & ActionRelations;
