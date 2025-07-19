import { TestBed } from '@automock/jest';
import { AuthorizationService } from '../../../../../src/application/authorization/services/authorization.service';
import { UsersService } from '../../../../../src/application/users/services/users.service';
import { LoginRequestDtoBuilder } from '../../../../__fixtures__/builders/authorization/loginRequestDto.builder';
import { UserBuilder } from '../../../../__fixtures__/builders/users/user.builder';
import { USER_NOT_FOUND } from '../../../../../src/shared/errors/error-messages';
import { LoginResponseDtoBuilder } from '../../../../__fixtures__/builders/authorization/loginResponseDto.builder';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensRequestDtoBuilder } from '../../../../__fixtures__/builders/authorization/refreshTokensRequestDto.builder';
import { RedisService } from '../../../../../src/application/redis/redis.service';

describe(`${AuthorizationService.name}`, () => {
  let service: AuthorizationService;

  let mockUsersService: jest.Mocked<UsersService>;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockRedisService: jest.Mocked<RedisService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthorizationService).compile();

    service = unit;

    mockUsersService = unitRef.get(UsersService);
    mockJwtService = unitRef.get(JwtService);
    mockRedisService = unitRef.get(RedisService);
  });

  describe(`${AuthorizationService.prototype.login.name}`, () => {
    test(`user not found -> should throw error`, async () => {
      const dto = LoginRequestDtoBuilder.defaultAll.result;
      const user = null;

      mockUsersService.findOneByEmailAndPassword = jest.fn().mockResolvedValue(user);

      await expect(() => service.login(dto)).rejects.toThrow(USER_NOT_FOUND);
    });

    test(`user found -> should generate tokens`, async () => {
      const dto = LoginRequestDtoBuilder.defaultAll.result;
      const user = UserBuilder.defaultAll.result;
      const result = LoginResponseDtoBuilder.defaultAll.result;

      mockUsersService.findOneByEmailAndPassword = jest.fn().mockResolvedValue(user);
      mockJwtService.sign.mockImplementation(() => {
        const mockReturnValues = [result.accessToken, result.refreshToken];
        return mockReturnValues.shift();
      });

      await expect(service.login(dto)).resolves.toStrictEqual(result);
    });
  });

  describe(`${AuthorizationService.prototype.refresh.name}`, () => {
    test(`should generate tokens`, async () => {
      const dto = RefreshTokensRequestDtoBuilder.defaultAll.result;
      const result = LoginResponseDtoBuilder.defaultAll.result;

      mockJwtService.sign.mockImplementation(() => {
        const mockReturnValues = [result.accessToken, result.refreshToken];
        return mockReturnValues.shift();
      });

      await expect(service.refresh(dto)).resolves.toStrictEqual(result);
    });

    test(`should save to redis used refreshToken`, async () => {
      const dto = RefreshTokensRequestDtoBuilder.defaultAll.result;
      const result = LoginResponseDtoBuilder.defaultAll.result;

      mockJwtService.sign.mockImplementation(() => {
        const mockReturnValues = [result.accessToken, result.refreshToken];
        return mockReturnValues.shift();
      });

      await service.refresh(dto);

      expect(mockRedisService.saveRefreshToken).toHaveBeenCalledWith(dto.refreshToken);
    });
  });
});
