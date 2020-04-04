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
import {Robot} from '../models';
import {RobotRepository} from '../repositories';

export class RobotController {
  constructor(
    @repository(RobotRepository)
    public robotRepository : RobotRepository,
  ) {}

  @post('/robots', {
    responses: {
      '200': {
        description: 'Robot model instance',
        content: {'application/json': {schema: getModelSchemaRef(Robot)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Robot, {
            title: 'NewRobot',
            exclude: ['id'],
          }),
        },
      },
    })
    robot: Omit<Robot, 'id'>,
  ): Promise<Robot> {
    return this.robotRepository.create(robot);
  }

  @get('/robots/count', {
    responses: {
      '200': {
        description: 'Robot model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Robot) where?: Where<Robot>,
  ): Promise<Count> {
    return this.robotRepository.count(where);
  }

  @get('/robots', {
    responses: {
      '200': {
        description: 'Array of Robot model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Robot, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Robot) filter?: Filter<Robot>,
  ): Promise<Robot[]> {
    return this.robotRepository.find(filter);
  }

  @patch('/robots', {
    responses: {
      '200': {
        description: 'Robot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Robot, {partial: true}),
        },
      },
    })
    robot: Robot,
    @param.where(Robot) where?: Where<Robot>,
  ): Promise<Count> {
    return this.robotRepository.updateAll(robot, where);
  }

  @get('/robots/{id}', {
    responses: {
      '200': {
        description: 'Robot model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Robot, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Robot, {exclude: 'where'}) filter?: FilterExcludingWhere<Robot>
  ): Promise<Robot> {
    return this.robotRepository.findById(id, filter);
  }

  @patch('/robots/{id}', {
    responses: {
      '204': {
        description: 'Robot PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Robot, {partial: true}),
        },
      },
    })
    robot: Robot,
  ): Promise<void> {
    await this.robotRepository.updateById(id, robot);
  }

  @put('/robots/{id}', {
    responses: {
      '204': {
        description: 'Robot PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() robot: Robot,
  ): Promise<void> {
    await this.robotRepository.replaceById(id, robot);
  }

  @del('/robots/{id}', {
    responses: {
      '204': {
        description: 'Robot DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.robotRepository.deleteById(id);
  }
}
