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
import {ServoMotion} from '../models';
import {ServoMotionRepository} from '../repositories';

export class ServoMotionController {
  constructor(
    @repository(ServoMotionRepository)
    public servoMotionRepository : ServoMotionRepository,
  ) {}

  @post('/servo-motions', {
    responses: {
      '200': {
        description: 'ServoMotion model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServoMotion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoMotion, {
            title: 'NewServoMotion',
            exclude: ['id'],
          }),
        },
      },
    })
    servoMotion: Omit<ServoMotion, 'id'>,
  ): Promise<ServoMotion> {
    return this.servoMotionRepository.create(servoMotion);
  }

  @get('/servo-motions/count', {
    responses: {
      '200': {
        description: 'ServoMotion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ServoMotion) where?: Where<ServoMotion>,
  ): Promise<Count> {
    return this.servoMotionRepository.count(where);
  }

  @get('/servo-motions', {
    responses: {
      '200': {
        description: 'Array of ServoMotion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServoMotion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ServoMotion) filter?: Filter<ServoMotion>,
  ): Promise<ServoMotion[]> {
    return this.servoMotionRepository.find(filter);
  }

  @patch('/servo-motions', {
    responses: {
      '200': {
        description: 'ServoMotion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoMotion, {partial: true}),
        },
      },
    })
    servoMotion: ServoMotion,
    @param.where(ServoMotion) where?: Where<ServoMotion>,
  ): Promise<Count> {
    return this.servoMotionRepository.updateAll(servoMotion, where);
  }

  @get('/servo-motions/{id}', {
    responses: {
      '200': {
        description: 'ServoMotion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServoMotion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServoMotion, {exclude: 'where'}) filter?: FilterExcludingWhere<ServoMotion>
  ): Promise<ServoMotion> {
    return this.servoMotionRepository.findById(id, filter);
  }

  @patch('/servo-motions/{id}', {
    responses: {
      '204': {
        description: 'ServoMotion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServoMotion, {partial: true}),
        },
      },
    })
    servoMotion: ServoMotion,
  ): Promise<void> {
    await this.servoMotionRepository.updateById(id, servoMotion);
  }

  @put('/servo-motions/{id}', {
    responses: {
      '204': {
        description: 'ServoMotion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servoMotion: ServoMotion,
  ): Promise<void> {
    await this.servoMotionRepository.replaceById(id, servoMotion);
  }

  @del('/servo-motions/{id}', {
    responses: {
      '204': {
        description: 'ServoMotion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servoMotionRepository.deleteById(id);
  }
}
