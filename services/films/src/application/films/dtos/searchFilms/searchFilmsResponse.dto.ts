import { ApiProperty, PickType } from '@nestjs/swagger';
import { Film } from '../../../../domain/films/film.entity';

export class SearchFilmsItemDto extends PickType(Film, ['id', 'title', 'imageId']) {
  public static from(film: Film): SearchFilmsItemDto {
    const dto = new SearchFilmsItemDto();

    dto.id = film.id;
    dto.title = film.title;
    dto.imageId = film.imageId;

    return dto;
  }
}

export class SearchFilmsResponseDto {
  @ApiProperty({ example: [{ id: 1, title: 'Начало', imageId: 1 }] })
  items: SearchFilmsItemDto[];

  public static from(films: Film[]): SearchFilmsResponseDto {
    const dto = new SearchFilmsResponseDto();

    dto.items = films.map(film => SearchFilmsItemDto.from(film));

    return dto;
  }
}
