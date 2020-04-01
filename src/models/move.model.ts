import { Model, model, property } from '@loopback/repository';

@model()
export class Move extends Model {

  @property({
    type: 'number',
  })
  movementId: number;

  @property({
    type: 'string',
  })
  status?: string;

  constructor(data?: Partial<Move>) {
    super(data);
  }
}

export interface MoveRelations {
  // describe navigational properties here
}

export type MoveWithRelations = Move & MoveRelations;
