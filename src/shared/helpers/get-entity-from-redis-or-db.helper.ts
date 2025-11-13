export const getEntityFromRedisOrDb = async <T>(
  redisGetter: () => Promise<string | null>,
  dbGetter: () => Promise<T | null>,
  setRedis: (entity: T) => Promise<void>,
): Promise<T | null> => {
  const redisData = await redisGetter();
  if (!redisData) {
    const dbData = await dbGetter();
    if (!dbData) return null;

    await setRedis(dbData);
    return dbData;
  }
  return JSON.parse(redisData);
};
