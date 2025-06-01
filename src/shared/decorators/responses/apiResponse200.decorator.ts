import { applyDecorators, HttpCode, HttpStatus, Type, UseInterceptors } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiResponse200 = <T extends Type<unknown>>(responseDto: T): ReturnType<typeof UseInterceptors> =>
  applyDecorators(
    HttpCode(200),
    ApiResponse({
      status: HttpStatus.OK,
      type: responseDto,
    }),
  );
