import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { clientRpcChannels } from 'src/shared/rpc-channels/client.rpc-channels';

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
      console.log('Ecuchando: ', ...clientRpcChannels);
    });
    this.redisSub.on('message', async (channel, message) => {
      const data = JSON.parse(message);
    });
  }
}
