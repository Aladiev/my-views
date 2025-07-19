import { Global, Module } from '@nestjs/common';
import RedisClient from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: RedisClient,
      useFactory: async () => {
        const client = new RedisClient({
          host: process.env.REDIS_HOST ?? '127.0.0.1',
          port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
        });
        client.on('error', (err) => console.error('Redis Client Error', err));
        if (!client.status) {
          await client.connect();
        }
        return client;
      },
    },
    RedisService,
  ],
  exports: [RedisClient, RedisService],
})
export class RedisModule { }
