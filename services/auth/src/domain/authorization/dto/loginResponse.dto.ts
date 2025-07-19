import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({ example: 'i5u5hn2g2j121j4.312321fsf12312fsdfasdwq' })
  accessToken: string;
  
  @ApiProperty({ example: 'm421hb6b5h12.312321fsf12312fsdfasdwq' })
  refreshToken: string;

  static from(accessToken, refreshToken) {
    const dto = new LoginResponseDto();

    dto.accessToken = accessToken;
    dto.refreshToken = refreshToken;

    return dto;
  }
}