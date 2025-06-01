import { PickType } from '@nestjs/swagger';
import { Film } from '../../../../domain/films/film.entity';

export class CreateFilmRequestDto extends PickType(Film, [
  'title',
  'year',
  'duration',
  'description',
  'imageId',
]) {}
