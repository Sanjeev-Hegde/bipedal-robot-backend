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
  Pca9685,
  Servo,
} from '../models';
import { Pca9685Repository } from '../repositories';

export class Pca9685ServoController {
  constructor(
    @repository(Pca9685Repository) protected pca9685Repository: Pca9685Repository,
  ) { }

  @get('/pca9685s/{id}/servos', {
    responses: {
      '200': {
        description: 'Array of Pca9685 has many Servo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Servo) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Servo>,
  ): Promise<Servo[]> {
    return this.pca9685Repository.servos(id).find(filter);
  }

  @post('/pca9685s/{id}/servos', {
    responses: {
      '200': {
        description: 'Pca9685 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Servo) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pca9685.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servo, {
            title: 'NewServoInPca9685',
            exclude: ['id'],
            optional: ['pca9685Id']
          }),
        },
      },
    }) servo: Omit<Servo, 'id'>,
  ): Promise<Servo> {
    return this.pca9685Repository.servos(id).create(servo);
  }

  @patch('/pca9685s/{id}/servos', {
    responses: {
      '200': {
        description: 'Pca9685.Servo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servo, { partial: true }),
        },
      },
    })
    servo: Partial<Servo>,
    @param.query.object('where', getWhereSchemaFor(Servo)) where?: Where<Servo>,
  ): Promise<Count> {
    return this.pca9685Repository.servos(id).patch(servo, where);
  }

  @del('/pca9685s/{id}/servos', {
    responses: {
      '200': {
        description: 'Pca9685.Servo DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Servo)) where?: Where<Servo>,
  ): Promise<Count> {
    return this.pca9685Repository.servos(id).delete(where);
  }
}
