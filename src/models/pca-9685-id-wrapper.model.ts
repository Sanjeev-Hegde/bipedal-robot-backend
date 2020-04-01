import { Model, model, property } from '@loopback/repository';

@model()
export class Pca9685IdWrapper extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true
  })
  pca9685IdList: number[];
  constructor(data?: Partial<Pca9685IdWrapper>) {
    super(data);
  }
}

export interface Pca9685IdWrapperRelations {
  // describe navigational properties here
}

export type Pca9685IdWrapperWithRelations = Pca9685IdWrapper & Pca9685IdWrapperRelations;
