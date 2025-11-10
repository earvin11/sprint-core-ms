import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { PlayerUseCases } from 'src/players/application/player.use-cases';
import {
  playerRpcChannels,
  PlayerRpcChannelsEnum,
} from 'src/shared/rpc-channels/player.rpc-channels';

@Controller('players')
export class PlayerController implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER') private readonly redisSub: Redis,
    @Inject('REDIS_PUBLISHER') private readonly redisPub: Redis,
    private readonly playerUseCases: PlayerUseCases,
    private readonly loggerPort: LoggerPort,
  ) {}
  onModuleInit() {
    this.redisSub
      .subscribe(...playerRpcChannels, () => {
        this.loggerPort.log(`Escuchando: ${playerRpcChannels}`);
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
        case PlayerRpcChannelsEnum.CREATE: {
          const resp = await this.playerUseCases.create(data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case PlayerRpcChannelsEnum.FIND_ALL: {
          const resp = await this.playerUseCases.findAll(data.page, data.limit);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case PlayerRpcChannelsEnum.FIND_BY_ID: {
          const resp = await this.playerUseCases.findById(data.id);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case PlayerRpcChannelsEnum.FIND_ONE: {
          const resp = await this.playerUseCases.findOneBy(data.filter);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case PlayerRpcChannelsEnum.UPDATE: {
          const resp = await this.playerUseCases.update(data.id, data.data);
          await this.redisPub.publish(
            replyChannel,
            JSON.stringify({ correlationId, data: resp }),
          );
          break;
        }

        case PlayerRpcChannelsEnum.DELETE: {
          const resp = await this.playerUseCases.remove(data.id);
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
