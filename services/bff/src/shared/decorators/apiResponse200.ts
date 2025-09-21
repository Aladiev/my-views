import { applyDecorators, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiResponse200 = (responseDto: any): ReturnType<typeof UseInterceptors> =>
  applyDecorators(
    HttpCode(200),
    ApiResponse({
      status: HttpStatus.OK,
      type: responseDto,
    }),
  );
