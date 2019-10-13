import {Model, model, property} from '@loopback/repository';

@model()
export class ServoType extends Model {
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


  constructor(data?: Partial<ServoType>) {
    super(data);
  }
}

export interface ServoTypeRelations {
  // describe navigational properties here
}

export type ServoTypeWithRelations = ServoType & ServoTypeRelations;
