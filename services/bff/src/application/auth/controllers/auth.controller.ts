import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse200 } from "../../../shared/decorators/apiResponse200";
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto, LoginRequestDto, LoginResponseDto, RefreshTokensRequestDto } from "@aladiev/auth-dtos";
import { AuthClient } from "@aladiev/auth-client";

@ApiTags('Authorization')
@Controller('authorization')
export class AuthController {
  public constructor(
    private readonly client: AuthClient,
  ) {}

  @Post('register')
  @ApiResponse200(LoginResponseDto)
  public register(@Body() dto: CreateUserRequestDto): Promise<LoginResponseDto> {
    return this.client.register(dto);
  }

  @Post('login')
  @ApiResponse200(LoginResponseDto)
  public login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.client.login(dto);
  }

  @Post('refresh')
  @ApiBody({ type: RefreshTokensRequestDto })
  @ApiResponse200(LoginResponseDto)
  public refresh(@Body() dto: RefreshTokensRequestDto): Promise<LoginResponseDto> {
    return this.client.refresh(dto);
  }
}