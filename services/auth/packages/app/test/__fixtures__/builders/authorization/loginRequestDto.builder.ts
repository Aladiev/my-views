import { InjectionFixtureBuilder } from '../../injectionFixtureBuilder';
import { LoginRequestDto } from '../../../../src/domain/authorization/dto/loginRequest.dto';

export class LoginRequestDtoBuilder {
  public static get defaultAll(): InjectionFixtureBuilder<LoginRequestDto> {
    return new InjectionFixtureBuilder(new LoginRequestDto()).with({
      email: 'test email',
      password: 'test password',
    });
  }
}
