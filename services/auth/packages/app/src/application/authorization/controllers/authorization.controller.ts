import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from '../../../domain/authorization/dto/loginRequest.dto';
import { AuthorizationService } from '../services/authorization.service';
import { LoginResponseDto } from '../../../domain/authorization/dto/loginResponse.dto';
import { RefreshTokensRequestDto } from '../../../domain/authorization/dto/refreshTokensRequest.dto';
import { RefreshToken } from '../decorators/refreshToken.decorator';
import { CreateUserDto } from '../../../shared/dto/users/CreateUser.dto';

@ApiTags('Authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly service: AuthorizationService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Register to app',
    type: LoginResponseDto,
  })
  public async register(@Body() dto: CreateUserDto): Promise<LoginResponseDto> {
    return this.service.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login to app',
    type: LoginResponseDto,
  })
  public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.service.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({
    type: RefreshTokensRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login to app',
    type: LoginResponseDto,
  })
  public refresh(
    @Body('refreshToken', RefreshToken) dto: RefreshTokensRequestDto,
  ): Promise<LoginResponseDto> {
    return this.service.refresh(dto);
  }
}
