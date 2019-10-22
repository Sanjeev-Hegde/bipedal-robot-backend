import { Entity, model, property } from '@loopback/repository';

@model()
export class Servo extends Entity {
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
    type: 'number',
    default: 90,
  })
  initialPosition?: number;

  @property({
    type: 'number',
    required: true,
  })
  channel: number;

  @property({
    type: 'number',
    required: true,
  })
  minPulseLength: number;

  @property({
    type: 'number',
    required: true,
  })
  maxPulseLength: number;

  constructor(data?: Partial<Servo>) {
    super(data);
  }
}

export interface ServoRelations {
  // describe navigational properties here
}

export type ServoWithRelations = Servo & ServoRelations;
