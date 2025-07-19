import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'myemail@yandex.ru' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
