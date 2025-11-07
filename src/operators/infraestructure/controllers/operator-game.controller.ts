import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { OperatorGameUseCases } from 'src/operators/application/operator-game/operator-game.use-cases';
import { OperatorRouletteUseCases } from 'src/operators/application/operator-game/operator-roulette.use-cases';
import { OperatorWheelUseCases } from 'src/operators/application/operator-game/operator-wheel.use-cases';
import {
  operatorGameRpcChannels,
  OperatorGameRpcChannelsEnum,
} from 'src/shared/rpc-channels/operator.rpc-channels';

@Controller('operator-games')
export class OperatorGameController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly operatorGameUseCases: OperatorGameUseCases,
    private readonly operatorRouletteUseCases: OperatorRouletteUseCases,
    private readonly operatorWheelUseCases: OperatorWheelUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    //TODO: separar channels
    this.redisSub
      .subscribe(...operatorGameRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${operatorGameRpcChannels}`);
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
        case OperatorGameRpcChannelsEnum.CREATE: {
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

          break;
        }

        case OperatorGameRpcChannelsEnum.FIND_ALL: {
          const resp = await this.operatorGameUseCases.findAll();
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case OperatorGameRpcChannelsEnum.FIND_BY_OPERATOR: {
          const resp = await this.operatorGameUseCases.findManyBy({
            operator: data.operator,
          });
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case OperatorGameRpcChannelsEnum.FIND_BY_OPERATOR_GAME: {
          const resp = await this.operatorGameUseCases.findOneBy({
            operator: data.operator,
            game: data.game,
          });
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case OperatorGameRpcChannelsEnum.UPDATE_BY_OPERATOR_GAME: {
          const { operator, game, ...rest } = data;
          const resp = await this.operatorGameUseCases.updateOne(
            { operator, game },
            rest,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case OperatorGameRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.operatorGameUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case OperatorGameRpcChannelsEnum.DELETE: {
          const resp = await this.operatorGameUseCases.remove(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }
      }
    });
  }
}
