import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { OperatorLimitsRouletteUseCases } from 'src/operators/application/operator-limits/operator-limits-roulette.use-cases';
import { OperatorLimitsWheelUseCases } from 'src/operators/application/operator-limits/operator-limits-wheel.use-cases';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits/operator-limits.use-cases';
import {
  operatorLimitsRpcChannels,
  OperatorLimitsRpcChannelsEnum,
} from 'src/shared/rpc-channels/operator.rpc-channels';

@Controller('operator-limits')
export class OperatorLimitsController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
    private readonly operatorLimitsRouletteUseCases: OperatorLimitsRouletteUseCases,
    private readonly operatorLimitsWheelUseCases: OperatorLimitsWheelUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    //TODO: separar channels
    this.redisSub
      .subscribe(...operatorLimitsRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${operatorLimitsRpcChannels}`);
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
        case OperatorLimitsRpcChannelsEnum.CREATE: {
          switch (data.typeGame) {
            case GameTypes.ROULETTE: {
              const resp =
                await this.operatorLimitsRouletteUseCases.create(data);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
            case GameTypes.WHEEL: {
              const resp = await this.operatorLimitsWheelUseCases.create(data);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
          }
          break;
        }
        case OperatorLimitsRpcChannelsEnum.FIND_ALL: {
          const resp = await this.operatorLimitsUseCases.findAll();
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }
        case OperatorLimitsRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.operatorLimitsUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }
        case OperatorLimitsRpcChannelsEnum.FIND_BY_OPERATOR: {
          const resp = await this.operatorLimitsUseCases.findManyBy(
            {
              operator: data.operator,
            },
            data.page,
            data.limit,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }
        case OperatorLimitsRpcChannelsEnum.FIND_BY_OPERATOR_CURRENCY: {
          const resp = await this.operatorLimitsUseCases.findOneBy({
            operator: data.operator,
            currency: data.currency,
          });
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }
        case OperatorLimitsRpcChannelsEnum.UPDATE_BY_OPERATOR_CURRENCY: {
          // const resp = await this.operatorLimitsUseCases.update()
          // await this.redisPub.publish(replyChannel, JSON.stringify({ correlationId, data: resp }));
          break;
        }
        case OperatorLimitsRpcChannelsEnum.DELETE: {
          const resp = await this.operatorLimitsUseCases.remove(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        default:
          break;
      }
    });
  }
}
