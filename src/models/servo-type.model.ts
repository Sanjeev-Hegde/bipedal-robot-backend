import { Model, model, property } from '@loopback/repository';

@model()
export class ServoType {
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


  constructor(data: ServoType) {
    this.minPulseLength = data.minPulseLength;
    this.maxPulseLength = data.maxPulseLength;
  }
}

export interface ServoTypeRelations {
  // describe navigational properties here
}

export type ServoTypeWithRelations = ServoType & ServoTypeRelations;
