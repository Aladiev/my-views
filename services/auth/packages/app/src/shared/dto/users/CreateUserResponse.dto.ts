import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty({ example: 'myemail@yandex.ru' })
  email: string;
}
