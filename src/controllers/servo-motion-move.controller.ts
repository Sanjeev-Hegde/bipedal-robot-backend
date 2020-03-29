// Uncomment these imports to begin using these cool features!

import { put, param, getModelSchemaRef, get } from '@loopback/rest';
import { Move } from '../models';

// import {inject} from '@loopback/context';


export class ServoMotionMoveController {
  constructor() { }

  @put('/servo-motions/{id}/move', {
    responses: {
      '204': {
        description: 'Motion.Move PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number
  ): Promise<void> {
  }


  @get('/servo-motions/{id}/move', {
    responses: {
      '200': {
        description: 'Movement.Move model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Move)
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<Move> {
    return new Move();
  }
}
