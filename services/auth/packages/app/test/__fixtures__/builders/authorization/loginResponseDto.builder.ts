import { LoginResponseDto } from '../../../../src/domain/authorization/dto/loginResponse.dto';
import { InjectionFixtureBuilder } from '../../injectionFixtureBuilder';

export class LoginResponseDtoBuilder {
  public static get defaultAll(): InjectionFixtureBuilder<LoginResponseDto> {
    return new InjectionFixtureBuilder(new LoginResponseDto()).with({
      refreshToken: 'test token',
      accessToken: 'test token',
    });
  }
}
