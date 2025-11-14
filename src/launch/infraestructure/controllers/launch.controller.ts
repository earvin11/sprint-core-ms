import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { LaunchUseCases } from 'src/launch/application/launch.use-case';
import { LobbyUseCases } from 'src/launch/application/lobby.use-case';
import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  LaunchpcChannelsEnum,
  launchRpcChannels,
} from 'src/shared/rpc-channels/launch.rpc-channels';

@Controller('launch')
export class LaunchController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly launchUseCases: LaunchUseCases,
    private readonly lobbyseCases: LobbyUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    this.redisSub
      .subscribe(...launchRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${launchRpcChannels}`);
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
        case LaunchpcChannelsEnum.LAUNCH: {
          const resp = await this.launchUseCases.run(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case LaunchpcChannelsEnum.LOBBY: {
          const resp = await this.lobbyseCases.run(data);
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
