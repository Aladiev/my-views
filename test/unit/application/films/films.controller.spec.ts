import { TestBed, Mocked } from '@suites/unit';

import { LoginRequestDtoBuilder } from '@/test/unit/builders/dto/authorization/loginRequestDto.builder';
import { FilmsController } from '../../../../src/application/films/controllers/films.controller';
import { FilmsService } from '../../../../src/application/films/services/films.service';

describe(`${FilmsController.name}`, () => {
  let controller: FilmsController;
  let stubService: Mocked<FilmsService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(FilmsController).compile();

    controller = unit;

    stubService = unitRef.get(FilmsService);
  });

  test(`${FilmsController.prototype.createFilm.name}`, async () => {
    await controller.createFilm(LoginRequestDtoBuilder.defaultAll.result);

    expect(stubService.login).toHaveBeenCalledTimes(1);
  });
});
