import { Injectable } from '@nestjs/common';
import { ClientUseCases } from 'src/clients/application/client.use-cases';
import { OperatorUseCases } from 'src/operators/application/operator.use-cases';
import { RedisStorePort } from 'src/redis/domain/redis-store.port';
import { getEntityFromRedisOrDb } from 'src/shared/helpers/get-entity-from-redis-or-db.helper';

@Injectable()
export class VerifyOperatorUseCase {
  constructor(
    private readonly clientUseCases: ClientUseCases,
    private readonly operatorUseCases: OperatorUseCases,
    private readonly redisStorePort: RedisStorePort,
  ) {}

  async run(operatorId: string, casinoToken: string) {
    const operator = await getEntityFromRedisOrDb(
      () => this.redisStorePort.get(`operator:${operatorId}`),
      () => this.operatorUseCases.findById(operatorId),
      (operatorDb) =>
        this.redisStorePort.set(
          `operator:${operatorId}`,
          JSON.stringify(operatorDb),
          360,
        ),
    );

    if (!operator) return { error: true, message: 'Operator not found' };
    if (!operator.status || !operator.available)
      return { error: true, message: 'Operator disabled or blocked' };

    const client = await getEntityFromRedisOrDb(
      () => this.redisStorePort.get(`client:${operator.client}`),
      () => this.clientUseCases.findById(operator.client),
      (clientDb) =>
        this.redisStorePort.set(
          `client:${operator.client}`,
          JSON.stringify(clientDb),
          360,
        ),
    );

    if (!client) return { error: true, message: 'Client not found' };
    if (!client.status || !client.available)
      return { error: true, message: 'Client disabled or blocked' };
    if (client.token !== casinoToken)
      return { error: true, message: 'Casino Token invalid' };

    return { operator, client };
  }
}
