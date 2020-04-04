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
  Movement,
} from '../models';
import {RobotRepository} from '../repositories';

export class RobotMovementController {
  constructor(
    @repository(RobotRepository) protected robotRepository: RobotRepository,
  ) { }

  @get('/robots/{id}/movements', {
    responses: {
      '200': {
        description: 'Array of Robot has many Movement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Movement>,
  ): Promise<Movement[]> {
    return this.robotRepository.movements(id).find(filter);
  }

  @post('/robots/{id}/movements', {
    responses: {
      '200': {
        description: 'Robot model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Robot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movement, {
            title: 'NewMovementInRobot',
            exclude: ['id'],
            optional: ['robotId']
          }),
        },
      },
    }) movement: Omit<Movement, 'id'>,
  ): Promise<Movement> {
    return this.robotRepository.movements(id).create(movement);
  }

  @patch('/robots/{id}/movements', {
    responses: {
      '200': {
        description: 'Robot.Movement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movement, {partial: true}),
        },
      },
    })
    movement: Partial<Movement>,
    @param.query.object('where', getWhereSchemaFor(Movement)) where?: Where<Movement>,
  ): Promise<Count> {
    return this.robotRepository.movements(id).patch(movement, where);
  }

  @del('/robots/{id}/movements', {
    responses: {
      '200': {
        description: 'Robot.Movement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Movement)) where?: Where<Movement>,
  ): Promise<Count> {
    return this.robotRepository.movements(id).delete(where);
  }
}
