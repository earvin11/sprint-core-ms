import { Controller, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { WheelUseCases } from 'src/games/application/wheel.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  wheelRpcChannels,
  WheelRpcChannelsEnum,
} from 'src/shared/rpc-channels/wheel.rpc-channels';

@Controller('wheels')
export class WheelController {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly wheelUseCases: WheelUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  onModuleInit() {
    this.redisSub.subscribe(...wheelRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${wheelRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case WheelRpcChannelsEnum.CREATE: {
          const resp = await this.wheelUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case WheelRpcChannelsEnum.FIND_ALL: {
          const resp = await this.wheelUseCases.findAll(data.page, data.limit);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case WheelRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.wheelUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case WheelRpcChannelsEnum.FIND_ONE: {
          const resp = await this.wheelUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case WheelRpcChannelsEnum.UPDATE: {
          const resp = await this.wheelUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case WheelRpcChannelsEnum.DELETE: {
          const resp = await this.wheelUseCases.remove(data.id);
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
