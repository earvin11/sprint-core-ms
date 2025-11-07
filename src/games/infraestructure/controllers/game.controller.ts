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
    this.redisSub
      .subscribe(...gameRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${gameRpcChannels}`);
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
        case GameRpcChannelsEnum.CREATE: {
          let resp;
          switch (data.type) {
            case GameTypes.ROULETTE: {
              resp = await this.rouletteUseCases.create(data);

              break;
            }
            case GameTypes.WHEEL: {
              resp = await this.wheelUseCases.create(data);

              break;
            }
          }
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
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
          let resp;
          console.log({ channel, data });
          switch (data.data.type) {
            case GameTypes.ROULETTE: {
              resp = await this.rouletteUseCases.update(data.id, {
                ...data.data,
              });
              console.log({ resp });
              break;
            }
            case GameTypes.WHEEL: {
              resp = await this.wheelUseCases.update(data.id, { ...data.data });

              break;
            }
          }
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
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
