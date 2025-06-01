import { Injectable } from '@nestjs/common';

import { Film } from '../../../domain/films/film.entity';
import { CreateFilmRequestDto } from '../dtos/createFilm/createFilmRequest.dto';
import { FilmsRepository } from '../repositories/films.repository';
import { SearchFilmsRequestDto } from '../dtos/searchFilms/searchFilmsRequest.dto';
import { SearchFilmsResponseDto } from '../dtos/searchFilms/searchFilmsResponse.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmsRepository) {}

  public createFilm(dto: CreateFilmRequestDto): Promise<Film | null> {
    const film = Film.create(dto);

    return this.repository.save(film);
  }

  public async searchFilms(dto: SearchFilmsRequestDto): Promise<SearchFilmsResponseDto> {
    const result = await this.repository.findByTitlePattern(dto.title);
    
    return SearchFilmsResponseDto.from(result);
  }
}
