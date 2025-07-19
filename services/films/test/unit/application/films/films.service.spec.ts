import { TestBed, Mocked } from '@suites/unit';

import { FilmsService } from '../../../../src/application/films/services/films.service';
import { CreateFilmRequestDtoBuilder, SearchFilmsRequestDtoBuilder } from '../../builders';
import { FilmsRepository } from '../../../../src/application/films/repositories/films.repository';
import { FilmBuilder } from '../../builders/entities/film.entity.builder';

describe(`${FilmsService.name}`, () => {
  let service: FilmsService;
  let stubRepository: Mocked<FilmsRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(FilmsService).compile();

    service = unit;

    stubRepository = unitRef.get(FilmsRepository);
  });

  test(`${FilmsService.prototype.createFilm.name}`, async () => {
    const dto = CreateFilmRequestDtoBuilder.defaultAll.result;

    await service.createFilm(dto);

    expect(stubRepository.save).toHaveBeenCalled();
  });

  test(`${FilmsService.prototype.searchFilms.name}`, async () => {
    stubRepository.findByTitlePattern = jest.fn().mockResolvedValue([FilmBuilder.defaultAll]);

    const dto = SearchFilmsRequestDtoBuilder.defaultAll.result;

    await service.searchFilms(dto);

    expect(stubRepository.findByTitlePattern).toHaveBeenCalledWith(dto.title);
  });

  test(`${FilmsService.prototype.getRecommendations.name}`, async () => {
    stubRepository.findRecommendations = jest.fn().mockResolvedValue([FilmBuilder.defaultAll]);

    await service.getRecommendations();

    expect(stubRepository.findRecommendations).toHaveBeenCalled();
  });
});
