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
    required: true,
    jsonSchema: {
      minimum: 0,
      maximum: 15
    }
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

  @property({
    type: 'number',
  })
  pca9685Id?: number;

  constructor(data?: Partial<Servo>) {
    super(data);
  }
}

export interface ServoRelations {
  // describe navigational properties here
}

export type ServoWithRelations = Servo & ServoRelations;
