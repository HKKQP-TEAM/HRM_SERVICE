import { StatusCodes } from 'http-status-codes';

import { ErrorCode } from '~/core';

import { HttpException } from './http-exception';
export class NotFoundException extends HttpException {
  constructor(key: string, message: string) {
    super(StatusCodes.NOT_FOUND, [
      {
        key,
        code: ErrorCode.NOT_FOUND,
        message,
      },
    ]);
  }
}
