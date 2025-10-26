import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { CrupierUseCases } from 'src/crupiers/application/crupier.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  crupierRpcChannels,
  CrupierRpcChannelsEnum,
} from 'src/shared/rpc-channels/crupier.rpc-channels';

@Controller('crupiers')
export class CrupierController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly crupierUseCases: CrupierUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  onModuleInit() {
    this.redisSub.subscribe(...crupierRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${crupierRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case CrupierRpcChannelsEnum.CREATE: {
          const resp = await this.crupierUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CrupierRpcChannelsEnum.FIND_ALL: {
          const resp = await this.crupierUseCases.findAll(
            data.page,
            data.limit,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CrupierRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.crupierUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CrupierRpcChannelsEnum.FIND_ONE: {
          const resp = await this.crupierUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CrupierRpcChannelsEnum.UPDATE: {
          const resp = await this.crupierUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CrupierRpcChannelsEnum.DELETE: {
          const resp = await this.crupierUseCases.remove(data.id);
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
