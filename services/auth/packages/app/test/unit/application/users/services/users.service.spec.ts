import { TestBed } from '@automock/jest';
import { UsersService } from '../../../../../src/application/users/services/users.service';
import { UsersRepository } from '../../../../../src/application/users/repositories/user.repository';
import { UserFactory } from '../../../../../src/application/users/factories/users.factory';
import { CreateUserDtoBuilder } from '../../../../__fixtures__/builders/users/createUserDto.builder';
import { UserBuilder } from '../../../../__fixtures__/builders/users/user.builder';

describe(`${UsersService.name}`, () => {
  let service: UsersService;

  let mockUsersRepository: jest.Mocked<UsersRepository>;
  let mockUserFactory: jest.Mocked<UserFactory>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();

    service = unit;

    mockUsersRepository = unitRef.get(UsersRepository);
    mockUserFactory = unitRef.get(UserFactory);
  });

  describe(`${UsersService.prototype.create.name}`, () => {
    test(`should call repository method`, async () => {
      const dto = CreateUserDtoBuilder.defaultAll.result;
      const user = UserBuilder.defaultAll.result;

      mockUserFactory.create = jest.fn().mockResolvedValue(user);

      await service.create(dto);

      expect(mockUsersRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe(`${UsersService.prototype.findOneByEmailAndPassword.name}`, () => {
    test(`should call repository method`, async () => {
      const user = UserBuilder.defaultAll.result;

      await service.findOneByEmailAndPassword(user.email, user.password);

      expect(mockUsersRepository.findOneByEmailAndPassword).toHaveBeenCalledWith(
        user.email,
        user.password,
      );
    });
  });
});
