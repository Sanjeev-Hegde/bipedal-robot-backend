import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Action,
  ServoMotion,
} from '../models';
import { ActionRepository } from '../repositories';

export class ActionServoMotionController {
  constructor(
    @repository(ActionRepository) protected actionRepository: ActionRepository,
  ) { }

  @get('/actions/{id}/servo-motions', {
    responses: {
      '200': {
        description: 'Array of Action has many ServoMotion',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ServoMotion) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ServoMotion>,
  ): Promise<ServoMotion[]> {
    return this.actionRepository.servoMotions(id).find(filter);
  }

  @post('/actions/{id}/servo-motions', {
    responses: {
      '200': {
        description: 'Action model instance',
        content: { 'application/json': { schema: getModelSchemaRef(ServoMotion) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Action.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoMotion, {
            title: 'NewServoMotionInAction',
            exclude: ['id'],
            optional: ['actionId']
          }),
        },
      },
    }) servoMotion: Omit<ServoMotion, 'id'>,
  ): Promise<ServoMotion> {
    return this.actionRepository.servoMotions(id).create(servoMotion);
  }

  @patch('/actions/{id}/servo-motions', {
    responses: {
      '200': {
        description: 'Action.ServoMotion PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoMotion, { partial: true }),
        },
      },
    })
    servoMotion: Partial<ServoMotion>,
    @param.query.object('where', getWhereSchemaFor(ServoMotion)) where?: Where<ServoMotion>,
  ): Promise<Count> {
    return this.actionRepository.servoMotions(id).patch(servoMotion, where);
  }

  @del('/actions/{id}/servo-motions', {
    responses: {
      '200': {
        description: 'Action.ServoMotion DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServoMotion)) where?: Where<ServoMotion>,
  ): Promise<Count> {
    return this.actionRepository.servoMotions(id).delete(where);
  }
}
