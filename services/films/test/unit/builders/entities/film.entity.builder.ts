import BaseBuilder from '../base.builder';

import { Film } from "../../../../src/domain/films/film.entity";
import { CreateFilmRequestDtoBuilder } from "../dtos/createFilms/createFilmRequestDto.builder";

export class FilmBuilder {
  public static get defaultAll(): BaseBuilder<Film> {
    return new BaseBuilder<Film>(new Film()).with({
      ...Film.create(CreateFilmRequestDtoBuilder.defaultAll.result),
    });
  }
}