import {
  Count,
  CountSchema,
  Filter,
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
import {Servo} from '../models';
import {ServoRepository} from '../repositories';

export class ServoController {
  constructor(
    @repository(ServoRepository)
    public servoRepository : ServoRepository,
  ) {}

  @post('/servos', {
    responses: {
      '200': {
        description: 'Servo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servo, {
            title: 'NewServo',
            exclude: ['id'],
          }),
        },
      },
    })
    servo: Omit<Servo, 'id'>,
  ): Promise<Servo> {
    return this.servoRepository.create(servo);
  }

  @get('/servos/count', {
    responses: {
      '200': {
        description: 'Servo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Servo)) where?: Where<Servo>,
  ): Promise<Count> {
    return this.servoRepository.count(where);
  }

  @get('/servos', {
    responses: {
      '200': {
        description: 'Array of Servo model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servo)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Servo)) filter?: Filter<Servo>,
  ): Promise<Servo[]> {
    return this.servoRepository.find(filter);
  }

  @patch('/servos', {
    responses: {
      '200': {
        description: 'Servo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servo, {partial: true}),
        },
      },
    })
    servo: Servo,
    @param.query.object('where', getWhereSchemaFor(Servo)) where?: Where<Servo>,
  ): Promise<Count> {
    return this.servoRepository.updateAll(servo, where);
  }

  @get('/servos/{id}', {
    responses: {
      '200': {
        description: 'Servo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servo)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Servo> {
    return this.servoRepository.findById(id);
  }

  @patch('/servos/{id}', {
    responses: {
      '204': {
        description: 'Servo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servo, {partial: true}),
        },
      },
    })
    servo: Servo,
  ): Promise<void> {
    await this.servoRepository.updateById(id, servo);
  }

  @put('/servos/{id}', {
    responses: {
      '204': {
        description: 'Servo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servo: Servo,
  ): Promise<void> {
    await this.servoRepository.replaceById(id, servo);
  }

  @del('/servos/{id}', {
    responses: {
      '204': {
        description: 'Servo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servoRepository.deleteById(id);
  }
}
