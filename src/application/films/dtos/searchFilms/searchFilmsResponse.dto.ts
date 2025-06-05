import { ApiProperty, PickType } from '@nestjs/swagger';
import { Film } from '../../../../domain/films/film.entity';

export class SearchFilmsItemDto extends PickType(Film, ['title', 'year', 'duration', 'imageId']) {
  public static from(film: Film): SearchFilmsItemDto {
    const dto = new SearchFilmsItemDto();

    dto.title = film.title;
    dto.year = film.year;
    dto.duration = film.duration;
    dto.imageId = film.imageId;

    return dto;
  }
}

export class SearchFilmsResponseDto {
  @ApiProperty({ example: [{ title: 'Начало', year: 2008, duration: 8880 }] })
  items: SearchFilmsItemDto[];

  public static from(films: Film[]): SearchFilmsResponseDto {
    const dto = new SearchFilmsResponseDto();

    dto.items = films.map(film => SearchFilmsItemDto.from(film));

    return dto;
  }
}
