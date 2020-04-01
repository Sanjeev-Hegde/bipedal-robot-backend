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
import { Pca9685, Pca9685IdWrapper } from '../models';
import { Pca9685Repository } from '../repositories';
import { service } from '@loopback/core';
import { Core } from '../services';

export class Pca9685Controller {
  coreService: Core;
  constructor(
    @service(Core) core: Core,
    @repository(Pca9685Repository)
    public pca9685Repository: Pca9685Repository,
  ) {
    this.coreService = core;
  }

  @post('/pca9685s', {
    responses: {
      '200': {
        description: 'Pca9685 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Pca9685) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685, {
            title: 'NewPca9685',
            exclude: ['id'],
          }),
        },
      },
    })
    pca9685: Omit<Pca9685, 'id'>,
  ): Promise<Pca9685> {
    return this.pca9685Repository.create(pca9685);
  }

  @get('/pca9685s/count', {
    responses: {
      '200': {
        description: 'Pca9685 model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(Pca9685) where?: Where<Pca9685>,
  ): Promise<Count> {
    return this.pca9685Repository.count(where);
  }

  @get('/pca9685s', {
    responses: {
      '200': {
        description: 'Array of Pca9685 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pca9685, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pca9685) filter?: Filter<Pca9685>,
  ): Promise<Pca9685[]> {
    return this.pca9685Repository.find(filter);
  }

  @patch('/pca9685s', {
    responses: {
      '200': {
        description: 'Pca9685 PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685, { partial: true }),
        },
      },
    })
    pca9685: Pca9685,
    @param.where(Pca9685) where?: Where<Pca9685>,
  ): Promise<Count> {
    return this.pca9685Repository.updateAll(pca9685, where);
  }

  @get('/pca9685s/{id}', {
    responses: {
      '200': {
        description: 'Pca9685 model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pca9685, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pca9685, { exclude: 'where' }) filter?: FilterExcludingWhere<Pca9685>
  ): Promise<Pca9685> {
    return this.pca9685Repository.findById(id, filter);
  }

  @patch('/pca9685s/{id}', {
    responses: {
      '204': {
        description: 'Pca9685 PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685, { partial: true }),
        },
      },
    })
    pca9685: Pca9685,
  ): Promise<void> {
    await this.pca9685Repository.updateById(id, pca9685);
  }

  @put('/pca9685s/{id}', {
    responses: {
      '204': {
        description: 'Pca9685 PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pca9685: Pca9685,
  ): Promise<void> {
    await this.pca9685Repository.replaceById(id, pca9685);
  }

  @del('/pca9685s/{id}', {
    responses: {
      '204': {
        description: 'Pca9685 DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pca9685Repository.deleteById(id);
  }

  @put('/pca9685s/initialize', {
    responses: {
      '200': {
        description: 'Initialize all Pca9685',
        content: { 'application/json': { schema: { "success": Boolean } } },
      },
    },
  })
  async initializePwms(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pca9685IdWrapper),
        },
      },
    })
    pca9685IdWrapper: Pca9685IdWrapper
  ): Promise<{ "success": Boolean }> {
    let filter: Filter<Pca9685> = {
      "include": [
        {
          "relation": "servos",
        }
      ]
    }
    this.pca9685Repository.find(filter).then((pca9685List) => {
      let filteredPca9685List = pca9685List.filter(pca9685 => {
        return pca9685IdWrapper.pca9685IdList.includes(pca9685.getId())
      })
      this.coreService.initializePWMs(filteredPca9685List); // asynchronous call
    })
    return { "success": true };
  }

  @get('/pca9685s/initialize', {
    responses: {
      '200': {
        description: 'initializes pca9685 list',
        content: {
          'application/json': {
            schema: Object,
          },
        },
      },
    },
  })
  async getInitialized(
  ): Promise<Map<number, boolean>> {
    let filter: Filter<Pca9685> = {
      "include": [
        {
          "relation": "servos",
        }
      ]
    }
    let pca9685List = await this.pca9685Repository.find(filter)
    return this.coreService.getInitializedPca9685s(pca9685List);
  }
}
