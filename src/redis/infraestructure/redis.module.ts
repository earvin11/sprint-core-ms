import { Module, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';
import { QueueService } from './implementations/queue.service';
import { RedisRpcService } from './implementations/redis-rpc.service';
import { RedisRpcPort } from '../domain/redis-rpc.port';
import { QueuesPort } from '../domain/queues.port';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

export const REDIS_CLIENT = 'REDIS_CLIENT';

const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    return new Redis({
      host: envs.redisHost,
      port: envs.redisPort,
      password: envs.redisPassword,
    });
  },
};

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: QueueName.CALCULATE_JACKPOT,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
      {
        name: QueueName.ROUND_SET_JACKPOT,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
    ),
    LoggerModule,
  ],
  providers: [
    {
      provide: 'REDIS_PUBLISHER',
      useFactory: () => {
        return new Redis({
          host: envs.redisHost,
          port: envs.redisPort,
          password: envs.redisPassword,
        });
      },
    },
    {
      provide: 'REDIS_SUBSCRIBER',
      useFactory: () => {
        return new Redis({
          host: envs.redisHost,
          port: envs.redisPort,
          password: envs.redisPassword,
        });
      },
    },
    redisProvider,
    QueueService,
    RedisRpcService,
    {
      provide: RedisRpcPort,
      useExisting: RedisRpcService,
    },
    {
      provide: QueuesPort,
      useExisting: QueueService,
    },
  ],
  exports: [
    'REDIS_PUBLISHER',
    'REDIS_SUBSCRIBER',
    redisProvider,
    RedisRpcPort,
    QueuesPort,
  ],
})
export class RedisModule {}
