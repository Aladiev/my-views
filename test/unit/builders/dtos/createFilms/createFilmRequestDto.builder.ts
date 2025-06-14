
import BaseBuilder from "../../base.builder";
import { CreateFilmRequestDto } from "../../../../../src/application/films/dtos/createFilm/createFilmRequest.dto";
import { faker } from '@faker-js/faker';

export class CreateFilmRequestDtoBuilder {
  public static get defaultAll(): BaseBuilder<CreateFilmRequestDto> {
    return new BaseBuilder<CreateFilmRequestDto>(new CreateFilmRequestDto()).with({
      title: faker.book.title(),
      year: faker.number.int({ min: 1900, max: 2100 }),
      duration: faker.number.int({ min: 6000, max: 12000 }),
      description: faker.lorem.lines(3),
      imageId: faker.number.int(),
    });
  }
}