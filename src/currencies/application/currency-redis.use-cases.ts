// import { CurrencyEntity } from "../domain/currency.entity";

// export class CurrencyRedisUseCases {
//     private redis: typeof Redis;
//     constructor(redis: typeof Redis) {
//         this.redis = redis;
//     }

//     public getAll = async() => {
//         const data = await this.redis.keys('currency:*');
//         return data;
//     };

//     public getById = async(id: string) => {
//         const data = await this.redis.get(`currency:${id}`);
//         return data;
//     };

//     public getByISOCode = async (isoCode: string) => {
//         const data = await this.redis.get(`currency:${isoCode}`);
//         return data;
//     };

//     public setCurrency = async(currency: CurrencyEntity, ttlSecconds = 600) => {
//         await this.redis.set(`currency:${currency._id}`, JSON.stringify(currency), 'EX', ttlSecconds );
//     };

//     public setCurrencyByISOCode = async(currency: CurrencyEntity, ttlSecconds = 600) => {
//         await this.redis.set(`currency:${ currency.short }`, JSON.stringify(currency), 'EX', ttlSecconds)
//     }

//     public remove = async(id: string) => {
//         await this.redis.del(`currency:${id}`);
//     };

//     public removeAll = async () => {
//         const keys = await this.redis.keys('currency:*');

//         // Si hay keys, eliminarlas
//         if (keys.length > 0) {
//             await this.redis.del(...keys);
//         }
//         return keys.length; // Retorna el número de keys eliminadas
//     };
// };
