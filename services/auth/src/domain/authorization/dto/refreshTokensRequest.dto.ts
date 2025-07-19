import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RefreshTokensRequestDto {
  @ApiProperty({ example: 'saldasldsald' })
  refreshToken: string;

  @IsString()
  email: string;

  @IsNumber()
  expRef: number;
};