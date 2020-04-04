import { Entity, model, property, hasMany} from '@loopback/repository';
import {Servo} from './servo.model';

@model()
export class Pca9685 extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
    default: 0x40,
  })
  address: number;

  @property({
    type: 'number',
    required: true,
    default: 50,
  })
  frequency: number;

  @hasMany(() => Servo)
  servos: Servo[];

  @property({
    type: 'number',
  })
  robotId?: number;

  constructor(data?: Partial<Pca9685>) {
    super(data);
  }
}

export interface Pca9685Relations {
  // describe navigational properties here
}

export type Pca9685WithRelations = Pca9685 & Pca9685Relations;
