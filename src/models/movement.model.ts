import {Entity, model, property, hasMany} from '@loopback/repository';
import {Action} from './action.model';

@model()
export class Movement extends Entity {
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
    required: true,
  })
  description: string;

  @hasMany(() => Action)
  actions: Action[];

  constructor(data?: Partial<Movement>) {
    super(data);
  }
}

export interface MovementRelations {
  // describe navigational properties here
}

export type MovementWithRelations = Movement & MovementRelations;
