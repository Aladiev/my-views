import { Inject, Injectable } from "@nestjs/common";
import RedisClient from "ioredis";
import { SOME_STRING } from "../../shared/constants";
import { ConfigService } from "@nestjs/config";
import { expirationTimeInSecondsEnv } from "../../shared/config/constants";

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisClient) private readonly redis: RedisClient,
    private readonly configService: ConfigService,
  ) {}
  async saveRefreshToken(token: string): Promise<void> {
    await this.redis.set(token, SOME_STRING);
    await this.redis.expire(token, this.configService.get(expirationTimeInSecondsEnv));
  }

  getRefreshToken(token: string): Promise<string | null> {
    return this.redis.get(token);
  }
}