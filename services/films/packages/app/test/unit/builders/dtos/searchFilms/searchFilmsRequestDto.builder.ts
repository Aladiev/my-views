import BaseBuilder from "../../base.builder";
import { faker } from '@faker-js/faker';
import { SearchFilmsRequestDto } from "../../../../../src/application/films/dtos/searchFilms/searchFilmsRequest.dto";

export class SearchFilmsRequestDtoBuilder {
  public static get defaultAll(): BaseBuilder<SearchFilmsRequestDto> {
    return new BaseBuilder<SearchFilmsRequestDto>(new SearchFilmsRequestDto()).with({
      title: faker.book.title(),
    });
  }
}