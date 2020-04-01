// Uncomment these imports to begin using these cool features!

import { put, param } from '@loopback/rest';
import { Move, Pca9685 } from '../models';
import { Core, PwmServoMap } from '../services';
import { service } from '@loopback/core';
import { repository, Filter } from '@loopback/repository';
import { Pca9685Repository } from '../repositories';

// import {inject} from '@loopback/context';


export class Pca9685ServoMoveControllerController {
  coreService: Core;
  constructor(
    @service(Core) core: Core
  ) {
    this.coreService = core;
  }

  @put('/pca9685s/{pcaId}/servos/{servoId}/move/{angle}', {
    responses: {
      '200': {
        description: 'Pca9685.Servo.Move PUT success',
        content: { 'application/json': { schema: Move } },
      },
    },
  })
  async moveServo(
    @param.path.number('pcaId') pcaId: number,
    @param.path.number('servoId') servoId: number,
    @param.path.number('angle') angle: number
  ): Promise<Move> {
    console.log("pcaId:" + pcaId);
    console.log("servoId:" + servoId);
    let pwmServoMap = this.coreService.pca9685Map.get(pcaId);
    let servo = pwmServoMap?.servoMap.get(servoId);
    if (pwmServoMap && servo) {
      this.coreService.moveServo(pwmServoMap.pwm, servo, angle);
      return new Move({ status: "moving servo " });
    }
    else {
      return new Move({ status: "properties are not correct" });
    }

  }
}
