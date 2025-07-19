import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseDto } from '../../../domain/authorization/dto/loginResponse.dto';
import { EMAIL_IS_ALREADY_EXISTS, USER_NOT_FOUND } from '../../../shared/errors/error-messages';
import { LoginRequestDto } from '../../../domain/authorization/dto/loginRequest.dto';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensRequestDto } from '../../../domain/authorization/dto/refreshTokensRequest.dto';
import { RedisService } from '../../redis/redis.service';
import { expirationTimeInSecondsEnv } from '../../../shared/config/constants';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../../shared/dto/users/CreateUser.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  public async register(dto: CreateUserDto): Promise<LoginResponseDto> {
        try {
           const user = await this.usersService.create(dto);

        const { accessToken, refreshToken } = this.generateTokens(user);

        return LoginResponseDto.from(accessToken, refreshToken);
        } catch (error: unknown) {
          if (
            error instanceof Error &&
            'code' in error &&
            error.code === 11000
          ) {
            throw new ConflictException(EMAIL_IS_ALREADY_EXISTS);
          }
          
          throw error;
        }
    
   
  }
  
  public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOneByEmailAndPassword(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    return LoginResponseDto.from(accessToken, refreshToken);
  }

  public async refresh(dto: RefreshTokensRequestDto): Promise<LoginResponseDto> {
    const { accessToken, refreshToken } = this.generateTokens(dto);

    await this.redisService.saveRefreshToken(dto.refreshToken);

    return LoginResponseDto.from(accessToken, refreshToken);
  }

  private generateTokens<T extends { email: string }>(user: T): { accessToken: string; refreshToken: string } {
    const accessTokenPayload = {
      email: user.email,
    };

    const refreshTokenPayload = {
      email: user.email,
      expRef: Math.floor(Date.now() / 1000) + 2 * this.configService.get(expirationTimeInSecondsEnv), // Токен обновления на 30 дней
    };

    const accessToken = this.jwtService.sign(accessTokenPayload);
    const refreshToken = this.jwtService.sign(refreshTokenPayload);

    return { accessToken, refreshToken };
  }
}
