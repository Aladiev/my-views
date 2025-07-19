import { TestBed } from '@automock/jest';
import { UsersController } from '../../../../../src/application/users/controllers/users.controller';
import { UsersService } from '../../../../../src/application/users/services/users.service';
import { CreateUserDtoBuilder } from '../../../../__fixtures__/builders/users/createUserDto.builder';

describe(`${UsersController.name}`, () => {
  let controller: UsersController;

  let mockUsersService: jest.Mocked<UsersService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UsersController).compile();

    controller = unit;

    mockUsersService = unitRef.get(UsersService);
  });

  test(`${UsersController.prototype.createUser.name}`, async () => {
    const dto = CreateUserDtoBuilder.defaultAll.result;

    await controller.createUser(dto);

    expect(
      mockUsersService.create,
    ).toHaveBeenCalledWith(dto);
  });
});
