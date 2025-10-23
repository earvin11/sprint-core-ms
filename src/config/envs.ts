import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  DB_URI: string;
  DB_NAME: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;

  SEQ_URL: string;
  SEQ_API_KEY: string;
  SEQ_WORKSAPCE: string;
}

const evnsSchema = joi
  .object({
    PORT: joi.number().required(),

    DB_URI: joi.string().required(),
    DB_NAME: joi.string().required(),

    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.string().required(),
    REDIS_PASSWORD: joi.string().required(),

    SEQ_URL: joi.string(),
    SEQ_API_KEY: joi.string(),
    SEQ_WORKSAPCE: joi.string(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,

  dbUri: envVars.DB_URI,
  dbName: envVars.DB_NAME,

  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
  redisPassword: envVars.REDIS_PASSWORD,

  // rabbitMqUrl: `amqp://${envVars.RABBITMQ_USER}:${envVars.RABBITMQ_PASS}@${envVars.RABBITMQ_HOST}:${envVars.RABBITMQ_PORT}`,

  seqUrl: envVars.SEQ_URL,
  seqApiKey: envVars.SEQ_API_KEY,
  seqWorkSpace: envVars.SEQ_WORKSAPCE,
};
