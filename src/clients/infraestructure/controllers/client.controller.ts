import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  clientRpcChannels,
  ClientRpcChannelsEnum,
} from 'src/shared/rpc-channels/client.rpc-channels';

@Controller('clients')
export class ClientController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly clientUseCases: ClientUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    this.redisSub.subscribe(...clientRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${clientRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case ClientRpcChannelsEnum.CREATE: {
          const resp = await this.clientUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_ALL: {
          const resp = await this.clientUseCases.findAll(data.page, data.limit);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.clientUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_ONE: {
          const resp = await this.clientUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.UPDATE: {
          const resp = await this.clientUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.DELETE: {
          const resp = await this.clientUseCases.remove(data.id);
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
