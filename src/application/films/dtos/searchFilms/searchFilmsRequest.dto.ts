import { ApiProperty } from '@nestjs/swagger';

export class SearchFilmsRequestDto {
  @ApiProperty({ example: 'ача' })
  readonly title: string;
}
