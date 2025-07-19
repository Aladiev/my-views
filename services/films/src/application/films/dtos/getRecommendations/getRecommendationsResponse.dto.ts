import { ApiProperty, PickType } from '@nestjs/swagger';
import { Film } from '../../../../domain/films/film.entity';

export class GetRecommendationsItemDto extends PickType(Film, ['id', 'title', 'year', 'imageId']) {
  public static from(film: Film): GetRecommendationsItemDto {
    const dto = new GetRecommendationsItemDto();

    dto.id = film.id;
    dto.title = film.title;
    dto.year = film.year;
    dto.imageId = film.imageId;

    return dto;
  }
}

export class GetRecommendationsResponseDto {
  @ApiProperty({
    example: [{ id: 1, title: 'Начало', year: 2008, imageId: 1 }],
  })
  items: GetRecommendationsItemDto[];

  public static from(films: Film[]): GetRecommendationsResponseDto {
    const dto = new GetRecommendationsResponseDto();

    dto.items = films.map(film => GetRecommendationsItemDto.from(film));

    return dto;
  }
}
