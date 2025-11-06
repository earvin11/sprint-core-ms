import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { OperatorRouletteUseCases } from 'src/operators/application/operator-game/operator-roulette.use-cases';
import { OperatorWheelUseCases } from 'src/operators/application/operator-game/operator-wheel.use-cases';
import {
  operatorRpcChannels,
  OperatorRpcChannelsEnum,
} from 'src/shared/rpc-channels/operator.rpc-channels';

@Controller('operator-games')
export class OperatorGameController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly operatorRouletteUseCases: OperatorRouletteUseCases,
    private readonly operatorWheelUseCases: OperatorWheelUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    //TODO: separar channels
    this.redisSub
      .subscribe(...operatorRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${operatorRpcChannels}`);
      })
      .catch((error) => {
        this.loggerPort.error(
          `Error al suscribirse a los canales de operadores: ${error.message}`,
        );
      });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case OperatorRpcChannelsEnum.ASSIGN_GAME: {
          switch (data.typeGame) {
            case GameTypes.ROULETTE: {
              const resp = await this.operatorRouletteUseCases.create(data);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
            case GameTypes.WHEEL: {
              const resp = await this.operatorWheelUseCases.create(data);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
            default:
              break;
          }
        }
      }
    });
  }
}
