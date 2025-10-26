import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { CurrencyUseCases } from 'src/currencies/application/currency.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  currencyRpcChannels,
  CurrencyRpcChannelsEnum,
} from 'src/shared/rpc-channels/currency.rpc-channels';

@Controller('currencies')
export class CurrencyController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly currencyUseCases: CurrencyUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}

  onModuleInit() {
    this.redisSub.subscribe(...currencyRpcChannels, () => {
      this.loggerPort.log(`Escuchando: ${currencyRpcChannels}`);
    });
    this.redisSub.on('message', async (channel, message) => {
      const payload = JSON.parse(message);
      const { correlationId, data, replyChannel } = payload;

      switch (channel) {
        case CurrencyRpcChannelsEnum.CREATE: {
          const resp = await this.currencyUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CurrencyRpcChannelsEnum.FIND_ALL: {
          const resp = await this.currencyUseCases.findAll(
            data.page,
            data.limit,
          );
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CurrencyRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.currencyUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CurrencyRpcChannelsEnum.FIND_ONE: {
          const resp = await this.currencyUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CurrencyRpcChannelsEnum.UPDATE: {
          const resp = await this.currencyUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case CurrencyRpcChannelsEnum.DELETE: {
          const resp = await this.currencyUseCases.remove(data.id);
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
