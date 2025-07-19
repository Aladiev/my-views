import { TestBed } from '@automock/jest';
import { RedisService } from '../../../../../src/application/redis/redis.service';
import RedisClient from 'ioredis';
import { SOME_STRING } from '../../../../../src/shared/constants';

describe(`${RedisService.name}`, () => {
  let service: RedisService;

  let mockRedisClient: jest.Mocked<RedisClient>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(RedisService).compile();

    service = unit;

    mockRedisClient = unitRef.get(RedisClient);
  });

  describe(`${RedisService.prototype.saveRefreshToken.name}`, () => {
    test(`should call client method`, async () => {
      const token = 'token';

      await service.saveRefreshToken(token);

      expect(mockRedisClient.set).toHaveBeenCalledWith(token, SOME_STRING);
      expect(mockRedisClient.expire).toHaveBeenCalledTimes(1);
    });
  });

  describe(`${RedisService.prototype.getRefreshToken.name}`, () => {
    test(`should call client method`, async () => {
      const token = 'token';

      await service.getRefreshToken(token);

      expect(mockRedisClient.get).toHaveBeenCalledWith(token);
    });
  });
});
