import { InjectionFixtureBuilder } from '../../injectionFixtureBuilder';
import { CreateUserDto } from '../../../../src/shared/dto/users/CreateUser.dto';

export class CreateUserDtoBuilder {
  public static get defaultAll(): InjectionFixtureBuilder<CreateUserDto> {
    return new InjectionFixtureBuilder(new CreateUserDto())
      .with({
        email: 'test email',
        password: 'test password'
      });
  }
}
