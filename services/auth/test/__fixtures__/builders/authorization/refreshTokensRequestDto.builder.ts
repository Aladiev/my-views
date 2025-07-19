import { InjectionFixtureBuilder } from '../../injectionFixtureBuilder';
import { RefreshTokensRequestDto } from '../../../../src/domain/authorization/dto/refreshTokensRequest.dto';

export class RefreshTokensRequestDtoBuilder {
  public static get defaultAll(): InjectionFixtureBuilder<RefreshTokensRequestDto> {
    return new InjectionFixtureBuilder(new RefreshTokensRequestDto())
      .with({
        refreshToken: 'test token',
        email: 'test email',
        expRef: Date.now(),
      });
  }
}
