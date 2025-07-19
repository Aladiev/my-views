import { TestBed } from '@automock/jest';
import { AuthorizationController } from '../../../../../src/application/authorization/controllers/authorization.controller';
import { LoginRequestDtoBuilder } from '../../../../__fixtures__/builders/authorization/loginRequestDto.builder';
import { AuthorizationService } from '../../../../../src/application/authorization/services/authorization.service';
import { RefreshTokensRequestDtoBuilder } from '../../../../__fixtures__/builders/authorization/refreshTokensRequestDto.builder';

describe(`${AuthorizationController.name}`, () => {
  let controller: AuthorizationController;

  let mockAuthorizationService: jest.Mocked<AuthorizationService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthorizationController).compile();

    controller = unit;

    mockAuthorizationService = unitRef.get(AuthorizationService);
  });

  test(`${AuthorizationController.prototype.login.name}`, async () => {
    const dto = LoginRequestDtoBuilder.defaultAll.result;

    await controller.login(dto);

    expect(mockAuthorizationService.login).toHaveBeenCalledWith(dto);
  });

  test(`${AuthorizationController.prototype.refresh.name}`, async () => {
    const dto = RefreshTokensRequestDtoBuilder.defaultAll.result;

    await controller.refresh(dto);

    expect(mockAuthorizationService.refresh).toHaveBeenCalledWith(dto);
  });
});
