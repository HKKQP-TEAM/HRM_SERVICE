import { StatusCodes } from 'http-status-codes';

import { ErrorCode } from '~/core';

import { HttpException } from './http-exception';
export class BadRequestException extends HttpException {
  constructor(key: string, message: string) {
    super(StatusCodes.BAD_REQUEST, [
      {
        key,
        code: ErrorCode.INVALID_REQUEST,
        message,
      },
    ]);
  }
}
