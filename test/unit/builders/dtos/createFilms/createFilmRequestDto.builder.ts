import InjectionBuilder from "@/test/unit/builders/injectionBuilder";
import { CreateFilmRequestDto } from "../../../../../src/application/films/dtos/createFilm/createFilmRequest.dto";

export class CreateFilmRequestDtoBuilder {
  public static get defaultAll(): InjectionBuilder<CreateFilmRequestDto> {
    return new InjectionBuilder<CreateFilmRequestDto>(new CreateFilmRequestDto()).with({
      login: faker.login,
      password: user.password,
    });
  }
}