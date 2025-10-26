import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { OperatorUseCases } from 'src/operators/application/operator.use-cases';
import { ClientRpcChannelsEnum } from 'src/shared/rpc-channels/client.rpc-channels';
import {
  operatorRpcChannels,
  OperatorRpcChannelsEnum,
} from 'src/shared/rpc-channels/operator.rpc-channels';

@Controller('operators')
export class OperatorController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly operatorUseCases: OperatorUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    this.redisSub.subscribe(...operatorRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${operatorRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case OperatorRpcChannelsEnum.CREATE: {
          const resp = await this.operatorUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_ALL: {
          const resp = await this.operatorUseCases.findAll(
            data.page,
            data.limit,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.operatorUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.FIND_ONE: {
          const resp = await this.operatorUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.UPDATE: {
          const resp = await this.operatorUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case ClientRpcChannelsEnum.DELETE: {
          const resp = await this.operatorUseCases.remove(data.id);
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
