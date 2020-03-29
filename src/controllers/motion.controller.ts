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
import {Motion} from '../models';
import {MotionRepository} from '../repositories';

export class MotionController {
  constructor(
    @repository(MotionRepository)
    public motionRepository : MotionRepository,
  ) {}

  @post('/motions', {
    responses: {
      '200': {
        description: 'Motion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Motion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motion, {
            title: 'NewMotion',
            exclude: ['id'],
          }),
        },
      },
    })
    motion: Omit<Motion, 'id'>,
  ): Promise<Motion> {
    return this.motionRepository.create(motion);
  }

  @get('/motions/count', {
    responses: {
      '200': {
        description: 'Motion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Motion) where?: Where<Motion>,
  ): Promise<Count> {
    return this.motionRepository.count(where);
  }

  @get('/motions', {
    responses: {
      '200': {
        description: 'Array of Motion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Motion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Motion) filter?: Filter<Motion>,
  ): Promise<Motion[]> {
    return this.motionRepository.find(filter);
  }

  @patch('/motions', {
    responses: {
      '200': {
        description: 'Motion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motion, {partial: true}),
        },
      },
    })
    motion: Motion,
    @param.where(Motion) where?: Where<Motion>,
  ): Promise<Count> {
    return this.motionRepository.updateAll(motion, where);
  }

  @get('/motions/{id}', {
    responses: {
      '200': {
        description: 'Motion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Motion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Motion, {exclude: 'where'}) filter?: FilterExcludingWhere<Motion>
  ): Promise<Motion> {
    return this.motionRepository.findById(id, filter);
  }

  @patch('/motions/{id}', {
    responses: {
      '204': {
        description: 'Motion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motion, {partial: true}),
        },
      },
    })
    motion: Motion,
  ): Promise<void> {
    await this.motionRepository.updateById(id, motion);
  }

  @put('/motions/{id}', {
    responses: {
      '204': {
        description: 'Motion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() motion: Motion,
  ): Promise<void> {
    await this.motionRepository.replaceById(id, motion);
  }

  @del('/motions/{id}', {
    responses: {
      '204': {
        description: 'Motion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.motionRepository.deleteById(id);
  }
}
