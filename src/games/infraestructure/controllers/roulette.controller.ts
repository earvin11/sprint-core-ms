import { Controller, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { RouletteUseCases } from 'src/games/application/roulette.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  rouletteRpcChannels,
  RouletteRpcChannelsEnum,
} from 'src/shared/rpc-channels/roulette.rpc-channels';

@Controller('roulettes')
export class RouletteController {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly rouletteUseCases: RouletteUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  onModuleInit() {
    this.redisSub.subscribe(...rouletteRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${rouletteRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case RouletteRpcChannelsEnum.CREATE: {
          const resp = await this.rouletteUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case RouletteRpcChannelsEnum.FIND_ALL: {
          const resp = await this.rouletteUseCases.findAll(
            data.page,
            data.limit,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case RouletteRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.rouletteUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case RouletteRpcChannelsEnum.FIND_ONE: {
          const resp = await this.rouletteUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case RouletteRpcChannelsEnum.UPDATE: {
          const resp = await this.rouletteUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case RouletteRpcChannelsEnum.DELETE: {
          const resp = await this.rouletteUseCases.remove(data.id);
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
