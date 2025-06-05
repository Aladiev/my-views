import { TestBed, Mocked } from '@suites/unit';

import { FilmsController } from '../../../../src/application/films/controllers/films.controller';
import { FilmsService } from '../../../../src/application/films/services/films.service';
import { CreateFilmRequestDtoBuilder, SearchFilmsRequestDtoBuilder } from '../../builders';

describe(`${FilmsController.name}`, () => {
  let controller: FilmsController;
  let stubService: Mocked<FilmsService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(FilmsController).compile();

    controller = unit;

    stubService = unitRef.get(FilmsService);
  });

  test(`${FilmsController.prototype.createFilm.name}`, async () => {
    const dto = CreateFilmRequestDtoBuilder.defaultAll.result;
    
    await controller.createFilm(dto);

    expect(stubService.createFilm).toHaveBeenCalledWith(dto);
  });
  
  test(`${FilmsController.prototype.searchFilms.name}`, async () => {
    const dto = SearchFilmsRequestDtoBuilder.defaultAll.result;
    
    await controller.searchFilms(dto);

    expect(stubService.searchFilms).toHaveBeenCalledWith(dto);
  });
});
