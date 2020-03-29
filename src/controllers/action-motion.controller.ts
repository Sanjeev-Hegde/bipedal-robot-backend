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
  Motion,
} from '../models';
import {ActionRepository} from '../repositories';

export class ActionMotionController {
  constructor(
    @repository(ActionRepository) protected actionRepository: ActionRepository,
  ) { }

  @get('/actions/{id}/motions', {
    responses: {
      '200': {
        description: 'Array of Action has many Motion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Motion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Motion>,
  ): Promise<Motion[]> {
    return this.actionRepository.motions(id).find(filter);
  }

  @post('/actions/{id}/motions', {
    responses: {
      '200': {
        description: 'Action model instance',
        content: {'application/json': {schema: getModelSchemaRef(Motion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Action.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motion, {
            title: 'NewMotionInAction',
            exclude: ['id'],
            optional: ['actionId']
          }),
        },
      },
    }) motion: Omit<Motion, 'id'>,
  ): Promise<Motion> {
    return this.actionRepository.motions(id).create(motion);
  }

  @patch('/actions/{id}/motions', {
    responses: {
      '200': {
        description: 'Action.Motion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motion, {partial: true}),
        },
      },
    })
    motion: Partial<Motion>,
    @param.query.object('where', getWhereSchemaFor(Motion)) where?: Where<Motion>,
  ): Promise<Count> {
    return this.actionRepository.motions(id).patch(motion, where);
  }

  @del('/actions/{id}/motions', {
    responses: {
      '200': {
        description: 'Action.Motion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Motion)) where?: Where<Motion>,
  ): Promise<Count> {
    return this.actionRepository.motions(id).delete(where);
  }
}
