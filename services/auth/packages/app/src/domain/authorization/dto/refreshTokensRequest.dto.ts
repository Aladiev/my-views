import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensRequestDto {
  @ApiProperty({ example: 'saldasldsald' })
  refreshToken: string;

  email: string;

  expRef: number;
}
