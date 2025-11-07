import { Controller, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { GameUseCases } from 'src/games/application/game.use-cases';
import { RouletteUseCases } from 'src/games/application/roulette.use-cases';
import { WheelUseCases } from 'src/games/application/wheel.use-cases';
import { GameTypes } from 'src/games/domain/entities/game.entity';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  gameRpcChannels,
  GameRpcChannelsEnum,
} from 'src/shared/rpc-channels/game.rpc-channels';

@Controller('games')
export class GameController {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly gameUseCases: GameUseCases,
    private readonly rouletteUseCases: RouletteUseCases,
    private readonly wheelUseCases: WheelUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  onModuleInit() {
    this.redisSub.subscribe(...gameRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${gameRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case GameRpcChannelsEnum.CREATE: {
          switch (data.typeGame) {
            case GameTypes.ROULETTE: {
              const resp = await this.rouletteUseCases.create(data);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
            case GameTypes.WHEEL: {
              const resp = await this.wheelUseCases.create(data);
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

        case GameRpcChannelsEnum.FIND_ALL: {
          const resp = await this.gameUseCases.findAll(data.page, data.limit);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case GameRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.gameUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case GameRpcChannelsEnum.FIND_ONE: {
          const resp = await this.gameUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case GameRpcChannelsEnum.UPDATE: {
          const { typeGame, id, ...rest } = data;
          switch (data.typeGame) {
            case GameTypes.ROULETTE: {
              const resp = await this.rouletteUseCases.update(id, rest);
              await this.redisPub.publish(
                replyChannel,
                JSON.stringify({ correlationId, data: resp }),
              );
              break;
            }
            case GameTypes.WHEEL: {
              const resp = await this.wheelUseCases.update(id, rest);
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

        case GameRpcChannelsEnum.DELETE: {
          const resp = await this.gameUseCases.remove(data.id);
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
