import { TestBed } from '@automock/jest';
import { Model } from 'mongoose';
import { User } from '../../../../../src/application/users/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UserFactory } from '../../../../../src/application/users/factories/users.factory';
import { CreateUserDtoBuilder } from '../../../../__fixtures__/builders/users/createUserDto.builder';

type UserModel = Model<User>;

describe(`${UserFactory.name}`, () => {
  let factory: UserFactory;

  let mockModel: jest.Mocked<UserModel>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserFactory)
      .mock(getModelToken(User.name))
      .using(jest.fn())
      .compile();

    factory = unit;

    mockModel = unitRef.get(getModelToken(User.name));
  });

  describe(`${UserFactory.prototype.create.name}`, () => {
    test(`should call model method`, async () => {
      const dto = CreateUserDtoBuilder.defaultAll.result;

      await factory.create(dto);
      
      expect(mockModel).toHaveBeenCalledTimes(1);
    });
  });
});
