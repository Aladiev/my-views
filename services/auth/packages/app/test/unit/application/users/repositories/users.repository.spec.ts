import { TestBed } from '@automock/jest';
import { UsersRepository } from '../../../../../src/application/users/repositories/user.repository';
import { UserBuilder } from '../../../../__fixtures__/builders/users/user.builder';
import { Model } from 'mongoose';
import { User } from '../../../../../src/application/users/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';

type UserModel = Model<User>;

describe(`${UsersRepository.name}`, () => {
  let repository: UsersRepository;

  let mockModel: jest.Mocked<UserModel>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersRepository)
      .mock(getModelToken(User.name))
      .using({
        findOne: jest.fn().mockReturnValue({ exec: jest.fn() }),
      })
      .compile();

    repository = unit;

    mockModel = unitRef.get(getModelToken(User.name));
  });

  describe(`${UsersRepository.prototype.save.name}`, () => {
    test(`should call model method`, async () => {
      const user = UserBuilder.defaultAll.result;

      user.save = jest.fn();

      await repository.save(user);

      expect(user.save).toHaveBeenCalledTimes(1);
    });
  });

  describe(`${UsersRepository.prototype.findOneByEmailAndPassword.name}`, () => {
    test(`should call repository method`, async () => {
      const user = UserBuilder.defaultAll.result;

      await repository.findOneByEmailAndPassword(user.email, user.password);

      expect(mockModel.findOne).toHaveBeenCalledWith({
        email: user.email,
        password: user.password,
      });
    });
  });
});
