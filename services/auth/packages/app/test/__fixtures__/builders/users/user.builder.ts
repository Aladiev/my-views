import { InjectionFixtureBuilder } from '../../injectionFixtureBuilder';
import { User, UsersSchema } from '../../../../src/application/users/schemas/users.schema';
import mongoose from 'mongoose';

export class UserBuilder {
  public static get defaultAll(): InjectionFixtureBuilder<User> {
    const dto = {
      email: 'test email',
      password: 'test password',
    };
    
    const UserModel = mongoose.model(User.name, UsersSchema);
    const user = new UserModel(dto) as User & { _id: User['_id'] };

    return new InjectionFixtureBuilder(user);
  }
}
