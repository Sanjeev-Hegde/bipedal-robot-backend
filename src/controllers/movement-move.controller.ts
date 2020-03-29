// Uncomment these imports to begin using these cool features!

import { put, param, requestBody, get, getModelSchemaRef } from '@loopback/rest';
import { Movement, Move } from '../models';
import { FilterExcludingWhere } from '@loopback/repository';

// import {inject} from '@loopback/context';


export class MovementMoveController {
  constructor() { }

  @put('/movements/{id}/move', {
    responses: {
      '204': {
        description: 'Movement.Move PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number
  ): Promise<void> {
    // await this.movementRepository.replaceById(id, movement);
  }


  @get('/movements/{id}/move', {
    responses: {
      '200': {
        description: 'Movement.Move model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Move),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Move> {
    return new Move();
    //return this.movementRepository.findById(id, filter);
  }


}
