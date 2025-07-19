import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'myemail@yandex.ru' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;
};