import Redis from '@ioc:Adonis/Addons/Redis';
import { ClientEntity } from '../domain/entities/client.entity';

export class ClientRedisUseCases {
  private key = 'client';
  private redis: typeof Redis;
  constructor(redis: typeof Redis) {
    this.redis = redis;
  }

  public getAll = async () => {
    const data = await this.redis.keys(`${this.key}:*`);
    return data;
  };

  public getById = async (id: string) => {
    const data = await this.redis.get(`${this.key}:${id}`);
    return data;
  };

  public setClient = async (client: ClientEntity, ttlSecconds = 600) => {
    await this.redis.set(
      `${this.key}:${client._id}`,
      JSON.stringify(client),
      'EX',
      ttlSecconds,
    );
  };

  public remove = async (id: string) => {
    await this.redis.del(`${this.key}:${id}`);
  };

  // Método para eliminar todas las keys que coincidan con el patrón `operator:*`
  public removeAll = async () => {
    // Obtener todas las keys que coinciden con el patrón `operator:*`
    const keys = await this.redis.keys(`${this.key}:*`);

    // Si hay keys, eliminarlas
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }

    return keys.length; // Retorna el número de keys eliminadas
  };
}
