import { Entity, model, property } from '@loopback/repository';

@model()
export class Motion extends Entity {
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
  // Define well-known properties here

  constructor(data?: Partial<Motion>) {
    super(data);
  }
}

export interface MotionRelations {
  // describe navigational properties here
}

export type MotionWithRelations = Motion & MotionRelations;
