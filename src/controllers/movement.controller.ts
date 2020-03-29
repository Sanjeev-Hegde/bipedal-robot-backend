import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Movement} from '../models';
import {MovementRepository} from '../repositories';

export class MovementController {
  constructor(
    @repository(MovementRepository)
    public movementRepository : MovementRepository,
  ) {}

  @post('/movements', {
    responses: {
      '200': {
        description: 'Movement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movement)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movement, {
            title: 'NewMovement',
            exclude: ['id'],
          }),
        },
      },
    })
    movement: Omit<Movement, 'id'>,
  ): Promise<Movement> {
    return this.movementRepository.create(movement);
  }

  @get('/movements/count', {
    responses: {
      '200': {
        description: 'Movement model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Movement) where?: Where<Movement>,
  ): Promise<Count> {
    return this.movementRepository.count(where);
  }

  @get('/movements', {
    responses: {
      '200': {
        description: 'Array of Movement model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Movement, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Movement) filter?: Filter<Movement>,
  ): Promise<Movement[]> {
    return this.movementRepository.find(filter);
  }

  @patch('/movements', {
    responses: {
      '200': {
        description: 'Movement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movement, {partial: true}),
        },
      },
    })
    movement: Movement,
    @param.where(Movement) where?: Where<Movement>,
  ): Promise<Count> {
    return this.movementRepository.updateAll(movement, where);
  }

  @get('/movements/{id}', {
    responses: {
      '200': {
        description: 'Movement model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movement, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Movement, {exclude: 'where'}) filter?: FilterExcludingWhere<Movement>
  ): Promise<Movement> {
    return this.movementRepository.findById(id, filter);
  }

  @patch('/movements/{id}', {
    responses: {
      '204': {
        description: 'Movement PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movement, {partial: true}),
        },
      },
    })
    movement: Movement,
  ): Promise<void> {
    await this.movementRepository.updateById(id, movement);
  }

  @put('/movements/{id}', {
    responses: {
      '204': {
        description: 'Movement PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() movement: Movement,
  ): Promise<void> {
    await this.movementRepository.replaceById(id, movement);
  }

  @del('/movements/{id}', {
    responses: {
      '204': {
        description: 'Movement DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.movementRepository.deleteById(id);
  }
}
