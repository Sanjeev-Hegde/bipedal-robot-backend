import {Entity, model, property} from '@loopback/repository';

@model()
export class ServoMotion extends Entity {
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
  servoId: number;

  @property({
    type: 'number',
    required: true,
  })
  finalPosition: number;

  @property({
    type: 'number',
  })
  speed?: number;

  @property({
    type: 'number',
  })
  actionId?: number;

  constructor(data?: Partial<ServoMotion>) {
    super(data);
  }
}

export interface ServoMotionRelations {
  // describe navigational properties here
}

export type ServoMotionWithRelations = ServoMotion & ServoMotionRelations;
