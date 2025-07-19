import { BadRequestException, ForbiddenException, Injectable, PipeTransform } from '@nestjs/common';
import { RefreshTokensRequestDto } from '../../../domain/authorization/dto/refreshTokensRequest.dto';
import { validateSync } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';
import {
  INVALID_TOKEN,
  REFRESH_TOKEN_IS_ALREADY_USED,
} from '../../../shared/errors/error-messages';
import { secretEnv } from '../../../shared/config/constants';

@Injectable()
export class RefreshToken implements PipeTransform {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async transform(value: string): Promise<RefreshTokensRequestDto> {
    let dto: RefreshTokensRequestDto | undefined;

    if (!value) return dto;

    const payload = await this.jwtService.verifyAsync(value, {
      secret: this.configService.get(secretEnv),
      ignoreExpiration: true,
    });

    console.log(
      payload.expRef,
      Math.floor(Date.now() / 1000),
      payload.expRef > Math.floor(Date.now() / 1000),
    );

    if (payload && payload.expRef > Math.floor(Date.now() / 1000)) {
      payload.refreshToken = value;
      validateSync(payload, RefreshTokensRequestDto);

      const disabledToken = await this.redisService.getRefreshToken(value);

      if (disabledToken) throw new ForbiddenException(REFRESH_TOKEN_IS_ALREADY_USED);

      return payload;
    }

    throw new BadRequestException(INVALID_TOKEN);
  }
}
