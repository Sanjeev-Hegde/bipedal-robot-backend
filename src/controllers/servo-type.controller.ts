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
import {ServoType} from '../models';
import {ServoTypeRepository} from '../repositories';

export class ServoTypeController {
  constructor(
    @repository(ServoTypeRepository)
    public servoTypeRepository : ServoTypeRepository,
  ) {}

  @post('/servo-types', {
    responses: {
      '200': {
        description: 'ServoType model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServoType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoType, {
            title: 'NewServoType',
            exclude: ['id'],
          }),
        },
      },
    })
    servoType: Omit<ServoType, 'id'>,
  ): Promise<ServoType> {
    return this.servoTypeRepository.create(servoType);
  }

  @get('/servo-types/count', {
    responses: {
      '200': {
        description: 'ServoType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ServoType) where?: Where<ServoType>,
  ): Promise<Count> {
    return this.servoTypeRepository.count(where);
  }

  @get('/servo-types', {
    responses: {
      '200': {
        description: 'Array of ServoType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServoType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ServoType) filter?: Filter<ServoType>,
  ): Promise<ServoType[]> {
    return this.servoTypeRepository.find(filter);
  }

  @patch('/servo-types', {
    responses: {
      '200': {
        description: 'ServoType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoType, {partial: true}),
        },
      },
    })
    servoType: ServoType,
    @param.where(ServoType) where?: Where<ServoType>,
  ): Promise<Count> {
    return this.servoTypeRepository.updateAll(servoType, where);
  }

  @get('/servo-types/{id}', {
    responses: {
      '200': {
        description: 'ServoType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServoType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServoType, {exclude: 'where'}) filter?: FilterExcludingWhere<ServoType>
  ): Promise<ServoType> {
    return this.servoTypeRepository.findById(id, filter);
  }

  @patch('/servo-types/{id}', {
    responses: {
      '204': {
        description: 'ServoType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoType, {partial: true}),
        },
      },
    })
    servoType: ServoType,
  ): Promise<void> {
    await this.servoTypeRepository.updateById(id, servoType);
  }

  @put('/servo-types/{id}', {
    responses: {
      '204': {
        description: 'ServoType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servoType: ServoType,
  ): Promise<void> {
    await this.servoTypeRepository.replaceById(id, servoType);
  }

  @del('/servo-types/{id}', {
    responses: {
      '204': {
        description: 'ServoType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servoTypeRepository.deleteById(id);
  }
}
