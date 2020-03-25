import { Entity, model, property } from '@loopback/repository';

@model()
export class ServoType extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    default: 700,
  })
  minPulseLength: number;

  @property({
    type: 'number',
    required: true,
    default: 2300,
  })
  maxPulseLength: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;


  constructor(data?: Partial<ServoType>) {
    super(data);
  }
}

export interface ServoTypeRelations {
  // describe navigational properties here
}

export type ServoTypeWithRelations = ServoType & ServoTypeRelations;
