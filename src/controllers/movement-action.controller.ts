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
  Movement,
  Action,
} from '../models';
import {MovementRepository} from '../repositories';

export class MovementActionController {
  constructor(
    @repository(MovementRepository) protected movementRepository: MovementRepository,
  ) { }

  @get('/movements/{id}/actions', {
    responses: {
      '200': {
        description: 'Array of Movement has many Action',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Action)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Action>,
  ): Promise<Action[]> {
    return this.movementRepository.actions(id).find(filter);
  }

  @post('/movements/{id}/actions', {
    responses: {
      '200': {
        description: 'Movement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Action)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Movement.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Action, {
            title: 'NewActionInMovement',
            exclude: ['id'],
            optional: ['movementId']
          }),
        },
      },
    }) action: Omit<Action, 'id'>,
  ): Promise<Action> {
    return this.movementRepository.actions(id).create(action);
  }

  @patch('/movements/{id}/actions', {
    responses: {
      '200': {
        description: 'Movement.Action PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Action, {partial: true}),
        },
      },
    })
    action: Partial<Action>,
    @param.query.object('where', getWhereSchemaFor(Action)) where?: Where<Action>,
  ): Promise<Count> {
    return this.movementRepository.actions(id).patch(action, where);
  }

  @del('/movements/{id}/actions', {
    responses: {
      '200': {
        description: 'Movement.Action DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Action)) where?: Where<Action>,
  ): Promise<Count> {
    return this.movementRepository.actions(id).delete(where);
  }
}
