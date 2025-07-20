import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokensRequestDto {
  @ApiProperty({ example: 'saldasldsald' })
  @IsString()
  refreshToken: string;

  email: string;

  expRef: number;
}
