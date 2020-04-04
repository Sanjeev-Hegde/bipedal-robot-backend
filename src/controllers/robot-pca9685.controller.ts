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
  Robot,
  Pca9685,
} from '../models';
import {RobotRepository} from '../repositories';

export class RobotPca9685Controller {
  constructor(
    @repository(RobotRepository) protected robotRepository: RobotRepository,
  ) { }

  @get('/robots/{id}/pca9685s', {
    responses: {
      '200': {
        description: 'Array of Robot has many Pca9685',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pca9685)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pca9685>,
  ): Promise<Pca9685[]> {
    return this.robotRepository.pca9685s(id).find(filter);
  }

  @post('/robots/{id}/pca9685s', {
    responses: {
      '200': {
        description: 'Robot model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pca9685)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Robot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685, {
            title: 'NewPca9685InRobot',
            exclude: ['id'],
            optional: ['robotId']
          }),
        },
      },
    }) pca9685: Omit<Pca9685, 'id'>,
  ): Promise<Pca9685> {
    return this.robotRepository.pca9685s(id).create(pca9685);
  }

  @patch('/robots/{id}/pca9685s', {
    responses: {
      '200': {
        description: 'Robot.Pca9685 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685, {partial: true}),
        },
      },
    })
    pca9685: Partial<Pca9685>,
    @param.query.object('where', getWhereSchemaFor(Pca9685)) where?: Where<Pca9685>,
  ): Promise<Count> {
    return this.robotRepository.pca9685s(id).patch(pca9685, where);
  }

  @del('/robots/{id}/pca9685s', {
    responses: {
      '200': {
        description: 'Robot.Pca9685 DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pca9685)) where?: Where<Pca9685>,
  ): Promise<Count> {
    return this.robotRepository.pca9685s(id).delete(where);
  }
}
